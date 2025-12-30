import { useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

export const useAnalytics = () => {
  const trackEvent = useCallback(async (eventType: string, metadata?: Record<string, string | number | boolean>) => {
    try {
      await supabase.from("analytics").insert([{
        event_type: eventType,
        page_path: window.location.pathname,
        metadata: (metadata || {}) as Json,
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
        await supabase.from("analytics").insert([{
          event_type: "page_view",
          page_path: window.location.pathname,
          metadata: { page_name: pageName || document.title } as Json,
        }]);
      } catch (error) {
        console.error("Analytics error:", error);
      }
    };

    trackPageView();
  }, [pageName]);
};
