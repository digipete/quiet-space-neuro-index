
-- 1. Fix rate limit function to no longer rely on text-matching IP inside message body
CREATE OR REPLACE FUNCTION public.check_contact_submission_rate_limit(user_ip text DEFAULT NULL::text, user_email text DEFAULT NULL::text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  submission_count integer;
  time_window interval := '1 hour'::interval;
BEGIN
  IF user_email IS NULL OR length(trim(user_email)) = 0 THEN
    RETURN true;
  END IF;

  SELECT COUNT(*) INTO submission_count
  FROM contact_submissions
  WHERE created_at > (now() - time_window)
    AND email = user_email;

  RETURN submission_count < 3;
END;
$function$;

-- 2. Revoke public/anon execute on SECURITY DEFINER helpers not needed for anon RLS
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM PUBLIC, anon;
REVOKE EXECUTE ON FUNCTION public.log_security_event(text, jsonb, text, text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.log_contact_submission() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

-- Keep spam/rate-limit callable because the anon INSERT policy references them,
-- but revoke from PUBLIC so they must be reached via the policy path.
REVOKE EXECUTE ON FUNCTION public.is_spam_content(text) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_contact_submission_rate_limit(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_spam_content(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_contact_submission_rate_limit(text, text) TO anon, authenticated;

-- Ensure authenticated can still call the RLS helpers
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;

-- 3. Add explicit restrictive SELECT policy for space_claims so scanners
-- can verify only admins can read claimant contact details.
DROP POLICY IF EXISTS "Only admins can view space claims" ON public.space_claims;
CREATE POLICY "Only admins can view space claims"
ON public.space_claims
FOR SELECT
TO authenticated
USING (public.is_admin());
