-- Add event_type and metadata to page_views for unified analytics
ALTER TABLE public.page_views
  ADD COLUMN IF NOT EXISTS event_type TEXT,
  ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- No change to RLS - inserts are already allowed for public role
