-- Add SELECT policy for contact_submissions table to restrict access to administrators only

-- First, let's create a helper function to check if a user is an admin
-- This function will return false for now, but can be updated when authentication is implemented
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  -- For now, return false since no admin system is implemented
  -- This function should be updated when user roles are implemented
  -- Example: SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = $1 AND role = 'admin')
  SELECT false;
$$;

-- Add SELECT policy for contact_submissions that only allows administrators
CREATE POLICY "Only administrators can view contact submissions"
ON public.contact_submissions
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Add comment explaining the security approach
COMMENT ON FUNCTION public.is_admin IS 'Security function to check administrator privileges. Currently returns false - update when implementing user roles system.';

COMMENT ON POLICY "Only administrators can view contact submissions" ON public.contact_submissions IS 'Restricts contact form data access to administrators only. Requires authentication and admin role system.';