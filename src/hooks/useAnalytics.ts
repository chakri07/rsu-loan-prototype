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
  const trackEvent = useCallback(async (eventType: string, metadata?: Record<string, any>) => {
    try {
      const session_id = getOrCreateSessionId() || null;
      await supabase.from("page_views").insert([{ 
        event_type: eventType,
        path: window.location.pathname,
        metadata: (metadata || {}) as Json,
        user_agent: navigator.userAgent || null,
        session_id,
      }]);
    } catch (error) {
      // Silently fail - analytics should never break the app
      console.error("Analytics error:", error);
    }
  }, []);

  return { trackEvent };
};

export const usePageView = (pageName?: string) => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const session_id = getOrCreateSessionId() || null;
        await supabase.from("page_views").insert([{ 
          event_type: "page_view",
          path: window.location.pathname,
          metadata: { page_name: pageName || document.title } as Json,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent || null,
          session_id,
        }]);
      } catch (error) {
        console.error("Analytics error:", error);
      }
    };

    trackPageView();
  }, [pageName]);
};
