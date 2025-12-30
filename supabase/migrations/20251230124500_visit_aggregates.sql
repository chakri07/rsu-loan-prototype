-- Create lightweight visit aggregation and session dedupe
CREATE TABLE IF NOT EXISTS public.visit_aggregates (
  day DATE NOT NULL PRIMARY KEY,
  visits BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS public.visit_sessions (
  session_id TEXT PRIMARY KEY,
  last_seen DATE
);

-- Function to increment today's visit count once per session
CREATE OR REPLACE FUNCTION public.increment_visit(p_session_id TEXT)
RETURNS VOID AS $$
BEGIN
  IF p_session_id IS NULL THEN
    INSERT INTO public.visit_aggregates(day, visits)
      VALUES (current_date, 1)
    ON CONFLICT (day) DO UPDATE SET visits = visit_aggregates.visits + 1;
  ELSE
    IF NOT EXISTS (
      SELECT 1 FROM public.visit_sessions WHERE session_id = p_session_id AND last_seen = current_date
    ) THEN
      INSERT INTO public.visit_sessions(session_id, last_seen)
        VALUES (p_session_id, current_date)
      ON CONFLICT (session_id) DO UPDATE SET last_seen = EXCLUDED.last_seen;

      INSERT INTO public.visit_aggregates(day, visits)
        VALUES (current_date, 1)
      ON CONFLICT (day) DO UPDATE SET visits = visit_aggregates.visits + 1;
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Allow the anon role to execute the RPC (so the frontend can call it with anon key)
GRANT EXECUTE ON FUNCTION public.increment_visit(TEXT) TO anon;

-- Enable Row Level Security and add restrictive policies so only the RPC (security definer)
-- can modify data. Public role cannot directly read/insert/update/delete.
ALTER TABLE public.visit_aggregates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public selects on visit_aggregates"
ON public.visit_aggregates
FOR SELECT
USING (false);
CREATE POLICY "No public inserts on visit_aggregates"
ON public.visit_aggregates
FOR INSERT
WITH CHECK (false);
CREATE POLICY "No public updates on visit_aggregates"
ON public.visit_aggregates
FOR UPDATE
USING (false);
CREATE POLICY "No public deletes on visit_aggregates"
ON public.visit_aggregates
FOR DELETE
USING (false);

ALTER TABLE public.visit_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "No public selects on visit_sessions"
ON public.visit_sessions
FOR SELECT
USING (false);
CREATE POLICY "No public inserts on visit_sessions"
ON public.visit_sessions
FOR INSERT
WITH CHECK (false);
CREATE POLICY "No public updates on visit_sessions"
ON public.visit_sessions
FOR UPDATE
USING (false);
CREATE POLICY "No public deletes on visit_sessions"
ON public.visit_sessions
FOR DELETE
USING (false);
