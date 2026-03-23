// Simple authentication utilities for admin panel
// Using session storage for client-side auth

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
  loginTime: number;
}

const SESSION_KEY = 'bmc_admin_session';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

/**
 * Authenticate admin user
 */
export async function authenticateAdmin(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      return false;
    }

    const data = (await response.json()) as { success?: boolean };

    if (!data.success) {
      return false;
    }

    const session: AdminUser = {
      username,
      isAuthenticated: true,
      loginTime: Date.now(),
    };

    if (typeof window !== "undefined") {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Check if admin is authenticated
 */
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;

  const sessionData = sessionStorage.getItem(SESSION_KEY);

  if (!sessionData) return false;

  try {
    const session: AdminUser = JSON.parse(sessionData);
    const now = Date.now();
    
    // Check if session is expired
    if (now - session.loginTime > SESSION_DURATION) {
      logout();
      return false;
    }

    return session.isAuthenticated;
  } catch {
    return false;
  }
}

/**
 * Get current admin user
 */
export function getCurrentAdmin(): AdminUser | null {
  if (typeof window === 'undefined') return null;

  const sessionData = sessionStorage.getItem(SESSION_KEY);

  if (!sessionData) return null;

  try {
    const session: AdminUser = JSON.parse(sessionData);
    return session;
  } catch {
    return null;
  }
}

/**
 * Logout admin user
 */
export function logout(): void {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Refresh session (extend expiry)
 */
export function refreshSession(): void {
  if (typeof window === 'undefined') return;

  const sessionData = sessionStorage.getItem(SESSION_KEY);

  if (!sessionData) return;

  try {
    const session: AdminUser = JSON.parse(sessionData);
    session.loginTime = Date.now();
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch (error) {
    console.error("Failed to refresh session:", error);
  }
}
