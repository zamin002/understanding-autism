import { useState, useEffect } from "react";
import { createSession } from "../api";

const SESSION_KEY = "autism_app_session";

function useSession() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    if (stored) {
      setSessionId(stored);
      return;
    }
    // create a new anonymous session on first visit
    createSession()
      .then((res) => {
        // handle both response shapes: {session: {id}} and {id} (defensive in case API shape changes)
        const id = res.data.session?.id || res.data.id;
        localStorage.setItem(SESSION_KEY, id);
        setSessionId(id);
      })
      .catch(() => {
        // backend unavailable — app still works without it
      });
  }, []);

  return { sessionId };
}

export default useSession;
