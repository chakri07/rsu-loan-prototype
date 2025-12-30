-- Make leverage_type nullable on waitlist to match frontend fields
ALTER TABLE public.waitlist
  ADD COLUMN IF NOT EXISTS leverage_type TEXT;

-- If the column exists and is NOT NULL, drop the NOT NULL constraint
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'waitlist' AND column_name = 'leverage_type' AND is_nullable = 'NO'
  ) THEN
    EXECUTE 'ALTER TABLE public.waitlist ALTER COLUMN leverage_type DROP NOT NULL';
  END IF;
END$$;
