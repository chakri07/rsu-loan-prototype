-- Create analytics table to track page views and signups
CREATE TABLE public.analytics (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    event_type TEXT NOT NULL,
    page_path TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert analytics events (anonymous tracking)
CREATE POLICY "Anyone can insert analytics events"
ON public.analytics
FOR INSERT
WITH CHECK (true);

-- Only service role can read analytics (no public read access)
CREATE POLICY "No public read access to analytics"
ON public.analytics
FOR SELECT
USING (false);

-- No updates allowed
CREATE POLICY "No updates to analytics"
ON public.analytics
FOR UPDATE
USING (false);

-- No deletes allowed  
CREATE POLICY "No deletes from analytics"
ON public.analytics
FOR DELETE
USING (false);

-- Add unique constraint on email for waitlist to prevent duplicates
ALTER TABLE public.waitlist ADD CONSTRAINT waitlist_email_unique UNIQUE (email);

-- Add check constraints for data validation on waitlist
ALTER TABLE public.waitlist 
ADD CONSTRAINT waitlist_email_format CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
ADD CONSTRAINT waitlist_name_length CHECK (char_length(name) BETWEEN 1 AND 100),
ADD CONSTRAINT waitlist_company_length CHECK (char_length(company) BETWEEN 1 AND 100);