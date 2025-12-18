// Central API base for the Discovery app
// In production, default to the nginx `/api` path so
// frontend and backend share the same origin.

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "/api";

export function apiUrl(path: string) {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${API_BASE_URL}${path}`;
}
