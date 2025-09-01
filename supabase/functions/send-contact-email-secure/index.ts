import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const resend = new (await import("npm:resend@2.0.0")).Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiry_type: string;
}

// Rate limiting storage (in-memory for demo, use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute window
  const maxRequests = 5; // Max 5 requests per minute per IP

  const current = rateLimitStore.get(ip);
  
  if (!current || now > current.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }
  
  if (current.count >= maxRequests) {
    return false;
  }
  
  current.count++;
  return true;
};

const sanitizeInput = (input: string): string => {
  // Basic HTML sanitization - remove potentially dangerous tags
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, '')
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting based on IP
    const clientIP = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, subject, message, inquiry_type }: ContactEmailRequest = await req.json();

    // Input validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Length validation
    if (message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Message too long (max 5000 characters)" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name.substring(0, 100)),
      email: sanitizeInput(email.substring(0, 200)),
      subject: sanitizeInput(subject.substring(0, 200)),
      message: sanitizeInput(message.substring(0, 5000)),
      inquiry_type: sanitizeInput(inquiry_type.substring(0, 50))
    };

    console.log("Processing secure contact email for:", sanitizedData.name, sanitizedData.email);

    // Check for spam patterns
    const spamPatterns = [
      /\b(viagra|cialis|poker|casino|lottery|bitcoin|crypto)\b/i,
      /\b(click here|visit now|act now|limited time)\b/i,
      /\$\$\$|!!!!/,
      /<a\s+href/i
    ];

    const fullText = `${sanitizedData.name} ${sanitizedData.email} ${sanitizedData.subject} ${sanitizedData.message}`;
    const isSpam = spamPatterns.some(pattern => pattern.test(fullText));

    if (isSpam) {
      console.log("Potential spam detected, blocking submission");
      return new Response(
        JSON.stringify({ error: "Submission blocked due to spam detection" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Store in database with additional metadata
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{
        ...sanitizedData,
        status: 'new',
        metadata: {
          ip: clientIP,
          user_agent: req.headers.get('user-agent'),
          timestamp: new Date().toISOString()
        }
      }]);

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Failed to store submission");
    }

    // Send notification email to admin
    const notificationResponse = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["hello@quietspace.club"],
      subject: `New Contact Form Submission: ${sanitizedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Inquiry Type:</strong> ${sanitizedData.inquiry_type}</p>
        <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted from Quiet Space Club contact form</small></p>
        <p><small>IP: ${clientIP} | User Agent: ${req.headers.get('user-agent')}</small></p>
      `,
    });

    // Send confirmation email to user
    const confirmationResponse = await resend.emails.send({
      from: "Quiet Space Club <onboarding@resend.dev>",
      to: [sanitizedData.email],
      subject: "We received your message!",
      html: `
        <h1>Thank you for contacting us, ${sanitizedData.name}!</h1>
        <p>We have received your message about "${sanitizedData.subject}" and will get back to you within 24 hours.</p>
        
        <h3>Your Message:</h3>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        
        <p>If you have any urgent questions, please don't hesitate to reach out.</p>
        
        <p>Best regards,<br>
        The Quiet Space Club Team</p>
        
        <hr>
        <p><small>This is an automated confirmation email. Please do not reply to this email.</small></p>
      `,
    });

    console.log("Secure notification email sent:", notificationResponse.data?.id);
    console.log("Secure confirmation email sent:", confirmationResponse.data?.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Message sent successfully"
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in secure send-contact-email function:", error);
    
    // Don't expose internal errors to clients
    return new Response(
      JSON.stringify({ error: "An error occurred while processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);