-- Phase 1: Critical Database Security Fixes

-- First, drop the overly permissive contact submissions policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Create enhanced rate limiting function for contact submissions
CREATE OR REPLACE FUNCTION public.check_contact_submission_rate_limit(user_ip text DEFAULT NULL, user_email text DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  submission_count integer;
  time_window interval := '1 hour'::interval;
BEGIN
  -- Check submissions in the last hour by IP or email
  SELECT COUNT(*) INTO submission_count
  FROM contact_submissions
  WHERE created_at > (now() - time_window)
    AND (
      (user_ip IS NOT NULL AND message LIKE '%' || user_ip || '%') OR
      (user_email IS NOT NULL AND email = user_email)
    );
  
  -- Allow max 3 submissions per hour per IP/email
  RETURN submission_count < 3;
END;
$$;

-- Create spam detection function
CREATE OR REPLACE FUNCTION public.is_spam_content(content_text text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Basic spam pattern detection
  IF content_text ~* '(viagra|cialis|casino|lottery|winner|congratulations|click here|free money|make money fast)' THEN
    RETURN true;
  END IF;
  
  -- Check for excessive repetitive characters
  IF content_text ~ '(.)\1{10,}' THEN
    RETURN true;
  END IF;
  
  -- Check for excessive caps
  IF LENGTH(REGEXP_REPLACE(content_text, '[^A-Z]', '', 'g')) > LENGTH(content_text) * 0.7 THEN
    RETURN true;
  END IF;
  
  RETURN false;
END;
$$;

-- Create enhanced contact submission policy with validation
CREATE POLICY "Enhanced contact form submission policy"
ON public.contact_submissions
FOR INSERT
TO anon, authenticated
WITH CHECK (
  -- Basic validation checks
  name IS NOT NULL AND LENGTH(TRIM(name)) >= 2 AND LENGTH(name) <= 100 AND
  email IS NOT NULL AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' AND
  subject IS NOT NULL AND LENGTH(TRIM(subject)) >= 3 AND LENGTH(subject) <= 200 AND
  message IS NOT NULL AND LENGTH(TRIM(message)) >= 10 AND LENGTH(message) <= 2000 AND
  inquiry_type IS NOT NULL AND inquiry_type IN ('general', 'partnership', 'support', 'other') AND
  
  -- Security validation checks
  NOT is_spam_content(message || ' ' || subject) AND
  check_contact_submission_rate_limit(NULL, email)
);

-- Add admin-only UPDATE policy for contact submissions
CREATE POLICY "Admins can update contact submissions"
ON public.contact_submissions
FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Add admin-only DELETE policy for contact submissions  
CREATE POLICY "Admins can delete contact submissions"
ON public.contact_submissions
FOR DELETE
TO authenticated
USING (is_admin());

-- Create security events logging table
CREATE TABLE IF NOT EXISTS public.security_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_details jsonb NOT NULL DEFAULT '{}',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address text,
  user_agent text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on security events table
ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

-- Only admins can view security events
CREATE POLICY "Admins can view security events"
ON public.security_events
FOR SELECT
TO authenticated
USING (is_admin());

-- Create function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  p_event_type text,
  p_event_details jsonb DEFAULT '{}',
  p_ip_address text DEFAULT NULL,
  p_user_agent text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.security_events (
    event_type,
    event_details,
    user_id,
    ip_address,
    user_agent
  ) VALUES (
    p_event_type,
    p_event_details,
    auth.uid(),
    p_ip_address,
    p_user_agent
  );
END;
$$;

-- Create trigger function for contact submission logging
CREATE OR REPLACE FUNCTION public.log_contact_submission()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Log successful contact submission
  PERFORM log_security_event(
    'CONTACT_SUBMISSION',
    jsonb_build_object(
      'submission_id', NEW.id,
      'email_domain', split_part(NEW.email, '@', 2),
      'inquiry_type', NEW.inquiry_type,
      'message_length', LENGTH(NEW.message)
    )
  );
  
  RETURN NEW;
END;
$$;

-- Add trigger for contact submission logging
CREATE TRIGGER contact_submission_security_log
  AFTER INSERT ON public.contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.log_contact_submission();

-- Create trigger for updated_at timestamp on security_events
CREATE TRIGGER update_security_events_updated_at
  BEFORE UPDATE ON public.security_events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);
CREATE INDEX IF NOT EXISTS idx_security_events_created_at ON public.security_events(created_at);
CREATE INDEX IF NOT EXISTS idx_security_events_event_type ON public.security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_user_id ON public.security_events(user_id);