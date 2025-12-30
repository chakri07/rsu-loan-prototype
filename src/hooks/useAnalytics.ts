import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

function getOrCreateSessionId() {
  try {
    const key = "rsu_session_id";
    let id = localStorage.getItem(key);
    if (!id) {
      id = (globalThis.crypto && (globalThis.crypto as any).randomUUID)
        ? (globalThis.crypto as any).randomUUID()
        : `sess_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem(key, id);
    }
    return id;
  } catch (e) {
    return undefined;
  }
}

export const useAnalytics = () => {
  // No-op analytics tracker to avoid extra writes on free tier.
  const trackEvent = useCallback(async (_eventType: string, _metadata?: Record<string, any>) => {
    // intentionally noop
    return;
  }, []);

  return { trackEvent };
};

export const usePageView = (pageName?: string) => {
  useEffect(() => {
    // No-op: page view counting is handled by `AnalyticsListener` via a lightweight RPC.
  }, [pageName]);
};
