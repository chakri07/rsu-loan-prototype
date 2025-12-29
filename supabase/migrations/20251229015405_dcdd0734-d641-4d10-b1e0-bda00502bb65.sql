-- Create waitlist table for RSU leverage loan interest
CREATE TABLE public.waitlist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  gender TEXT NOT NULL,
  net_worth TEXT NOT NULL,
  leverage_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (anyone can join the waitlist)
CREATE POLICY "Anyone can join the waitlist" 
ON public.waitlist 
FOR INSERT 
WITH CHECK (true);

-- Only allow reading own entry (by email match - for future use)
CREATE POLICY "Users cannot read waitlist entries" 
ON public.waitlist 
FOR SELECT 
USING (false);