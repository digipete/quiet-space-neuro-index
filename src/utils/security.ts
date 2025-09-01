/**
 * Security utilities for the Quiet Space Club application
 */

import DOMPurify from 'dompurify';

// Rate limiting configuration
export const RATE_LIMITS = {
  CONTACT_FORM: {
    WINDOW_MS: 5000, // 5 seconds
    MAX_ATTEMPTS: 1
  },
  LOGIN_ATTEMPTS: {
    WINDOW_MS: 15 * 60 * 1000, // 15 minutes
    MAX_ATTEMPTS: 5
  }
};

// Input validation patterns
export const VALIDATION_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]{10,}$/,
  URL: /^https?:\/\/[^\s/$.?#].[^\s]*$/i
};

// Spam detection patterns
export const SPAM_PATTERNS = [
  /\b(viagra|cialis|poker|casino|lottery|bitcoin|crypto)\b/i,
  /\b(click here|visit now|act now|limited time)\b/i,
  /\$\$\$|!!!!/,
  /<a\s+href/i,
  /\b(buy now|free money|make money fast)\b/i
];

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string, options?: {
  allowedTags?: string[];
  maxLength?: number;
}): string => {
  const defaultOptions = {
    allowedTags: [],
    maxLength: 5000
  };
  
  const config = { ...defaultOptions, ...options };
  
  // Basic length check
  const truncated = input.substring(0, config.maxLength);
  
  // Sanitize with DOMPurify
  return DOMPurify.sanitize(truncated, {
    ALLOWED_TAGS: config.allowedTags,
    ALLOWED_ATTR: []
  }).trim();
};

/**
 * Check if text contains spam patterns
 */
export const isSpamContent = (text: string): boolean => {
  return SPAM_PATTERNS.some(pattern => pattern.test(text));
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  return VALIDATION_PATTERNS.EMAIL.test(email);
};

/**
 * Check if honeypot field is filled (indicates bot)
 */
export const isHoneypotTriggered = (honeypotValue: string): boolean => {
  return honeypotValue.trim().length > 0;
};

/**
 * Simple rate limiter for client-side
 */
class ClientRateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();

  checkLimit(key: string, windowMs: number, maxAttempts: number): boolean {
    const now = Date.now();
    const current = this.attempts.get(key);

    if (!current || now > current.resetTime) {
      this.attempts.set(key, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (current.count >= maxAttempts) {
      return false;
    }

    current.count++;
    return true;
  }

  getRemainingTime(key: string): number {
    const current = this.attempts.get(key);
    if (!current) return 0;
    
    const now = Date.now();
    return Math.max(0, current.resetTime - now);
  }
}

export const rateLimiter = new ClientRateLimiter();

/**
 * Security event logger
 */
export const logSecurityEvent = (event: {
  type: 'SPAM_DETECTED' | 'RATE_LIMIT_HIT' | 'HONEYPOT_TRIGGERED' | 'INVALID_INPUT';
  details: string;
  timestamp?: Date;
}) => {
  const logData = {
    ...event,
    timestamp: event.timestamp || new Date(),
    userAgent: navigator.userAgent,
    url: window.location.href
  };

  // In development, log to console
  if (process.env.NODE_ENV === 'development') {
    console.warn('Security Event:', logData);
  }

  // In production, you might want to send to a monitoring service
  // Example: sendToAnalytics(logData);
};

/**
 * Validate and sanitize contact form data
 */
export const validateContactForm = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
}): {
  isValid: boolean;
  errors: string[];
  sanitized?: any;
} => {
  const errors: string[] = [];

  // Check honeypot
  if (isHoneypotTriggered(data.honeypot || '')) {
    logSecurityEvent({
      type: 'HONEYPOT_TRIGGERED',
      details: 'Bot detected via honeypot field'
    });
    return { isValid: false, errors: ['Invalid submission'] };
  }

  // Validate required fields
  if (!data.name?.trim()) errors.push('Name is required');
  if (!data.email?.trim()) errors.push('Email is required');
  if (!data.message?.trim()) errors.push('Message is required');

  // Validate email format
  if (data.email && !isValidEmail(data.email)) {
    errors.push('Invalid email format');
  }

  // Check for spam
  const fullText = `${data.name} ${data.email} ${data.subject} ${data.message}`;
  if (isSpamContent(fullText)) {
    logSecurityEvent({
      type: 'SPAM_DETECTED',
      details: 'Spam patterns detected in form submission'
    });
    errors.push('Submission blocked due to spam detection');
  }

  // Length validation
  if (data.message && data.message.length > 5000) {
    errors.push('Message is too long (max 5000 characters)');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize data
  const sanitized = {
    name: sanitizeInput(data.name, { maxLength: 100 }),
    email: sanitizeInput(data.email, { maxLength: 200 }),
    subject: sanitizeInput(data.subject, { maxLength: 200 }),
    message: sanitizeInput(data.message, { maxLength: 5000 })
  };

  return { isValid: true, errors: [], sanitized };
};