-- Add restrictive policy to prevent UPDATE on waitlist table
CREATE POLICY "No one can update waitlist entries"
ON public.waitlist
AS RESTRICTIVE
FOR UPDATE
USING (false);

-- Add restrictive policy to prevent DELETE on waitlist table
CREATE POLICY "No one can delete waitlist entries"
ON public.waitlist
AS RESTRICTIVE
FOR DELETE
USING (false);