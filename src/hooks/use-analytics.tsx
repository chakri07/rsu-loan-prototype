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
    const session_id = getOrCreateSessionId() || null;

    // Call RPC once per session to increment today's visit count.
    // This reduces write volume compared to per-click/pageview rows.
    supabase.rpc("increment_visit", { p_session_id: session_id }).catch(() => {
      // swallow errors to avoid breaking the app
    });
  }, [location]);

  return null;
}

export default AnalyticsListener;
