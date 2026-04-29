/**
 * SSO Token Config
 *
 * Paste the user's access token here.
 * When set, any visitor to the app will be auto-authenticated
 * with this token — no login form required.
 *
 * Leave as empty string "" to require normal login.
 *
 * HOW TO GET THE TOKEN:
 *   1. Log in as the user in the browser
 *   2. Open DevTools → Application → Local Storage
 *   3. Copy the value of "access_token"
 *   4. Paste it below
 */
export const SSO_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc3NTIzMjA0LCJpYXQiOjE3Nzc0MzY4MDQsImp0aSI6ImU3OTg5OGQzOTRmNDQyY2ZiMzMyYTQ1NTMyMzMyZDQxIiwidXNlcl9pZCI6IjAzYmJlYjNhLTNjMDYtNGYyYS05YjMxLWQ2YTc5OGQ3ZTU1OCJ9.1kmXcAT__VYPhJlD6-Fpn4IQwgdYfEID0UKwr7mRvps";

/**
 * Token expiry (ISO string or null).
 * If null, assumes 24 hours from now.
 * Example: "2026-05-10T10:00:00.000Z"
 */
export const SSO_TOKEN_EXPIRY = null;
