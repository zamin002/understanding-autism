import axios from "axios";

// probably not the cleanest way to do this but it works fine for dev + prod
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  headers: { "Content-Type": "application/json" },
});

// modules
export const fetchModules = () => api.get("/modules");
export const fetchModule = (slug) => api.get(`/modules/${slug}`);

// sessions
export const createSession = (displayName) => api.post("/sessions", { displayName });
export const getSession = (id) => api.get(`/sessions/${id}`);

// progress tracking
export const fetchProgress = (sessionId) => api.get(`/progress/${sessionId}`);
export const updateProgress = (sessionId, moduleId, status, score) =>
  api.post("/progress", { sessionId, moduleId, status, score });

// scenario stuff
export const fetchScenarios = (moduleId) => api.get(`/scenarios/module/${moduleId}`);
export const fetchChoices = (scenarioId) => api.get(`/scenarios/${scenarioId}/choices`);
export const recordAttempt = (sessionId, scenarioId, choiceId) =>
  api.post("/scenarios/attempt", { sessionId, scenarioId, choiceId });

export default api;
