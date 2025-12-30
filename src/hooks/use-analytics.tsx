import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

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

export function AnalyticsListener() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname + location.search;
    const referrer = document.referrer || null;
    const user_agent = navigator.userAgent || null;
    const session_id = getOrCreateSessionId() || null;

    // fire-and-forget insert
    supabase
      .from("page_views")
      .insert({ path, referrer, user_agent, session_id })
      .then(() => {
        // intentionally noop
      })
      .catch(() => {
        // swallow errors to avoid breaking the app
      });
  }, [location]);

  return null;
}

export default AnalyticsListener;
