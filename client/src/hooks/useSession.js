import { useState, useEffect } from "react";
import { createSession, getSession } from "../api";

const SESSION_KEY = "autism_app_session";

function startNewSession(setSessionId) {
  createSession()
    .then((res) => {
      const id = res.data.session?.id || res.data.id;
      localStorage.setItem(SESSION_KEY, id);
      setSessionId(id);
    })
    .catch(() => {
      // backend unavailable — app still works without it
    });
}

function useSession() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) {
      startNewSession(setSessionId);
      return;
    }
    // verify the stored session still exists in the DB (e.g. after a DB reset)
    getSession(stored)
      .then(() => setSessionId(stored))
      .catch((err) => {
        if (err.response?.status === 404) {
          localStorage.removeItem(SESSION_KEY);
          startNewSession(setSessionId);
        }
        // any other error (network down etc.) — keep the stored id and retry later
      });
  }, []);

  return { sessionId };
}

export default useSession;
