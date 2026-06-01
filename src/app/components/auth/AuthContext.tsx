/**
 * AuthContext.tsx
 * Decoupled authentication scaffold.
 * Compatible with Clerk, Auth0, or any OAuth provider — swap the stub
 * implementations below with your chosen SDK's methods.
 *
 * Environment stubs (see .env.example):
 *   VITE_AUTH_BASE_URL     — provider redirect base (e.g. https://accounts.myapp.com)
 *   VITE_AUTH_CLIENT_ID    — OAuth client ID
 *   VITE_AUTH_REDIRECT_URI — callback URI registered with the provider
 */

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { track } from "../../services/analyticsService";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  provider: "google" | "github";
}

export type AuthStatus = "unauthenticated" | "loading" | "authenticated" | "error";

export type SocialProvider = "google" | "github";

interface AuthContextValue {
  user: AuthUser | null;
  status: AuthStatus;
  /** True while an auth redirect is in progress */
  isLoading: boolean;
  signInWith: (provider: SocialProvider) => void;
  signOut: () => Promise<void>;
}

// ── Config ────────────────────────────────────────────────────────────────────

const AUTH_BASE =
  (import.meta.env.VITE_AUTH_BASE_URL as string | undefined) ?? "";
const AUTH_CLIENT_ID =
  (import.meta.env.VITE_AUTH_CLIENT_ID as string | undefined) ?? "";
const REDIRECT_URI =
  (import.meta.env.VITE_AUTH_REDIRECT_URI as string | undefined) ??
  (typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "");

const PROVIDER_PATHS: Record<SocialProvider, string> = {
  google: "/auth/google",
  github: "/auth/github",
};

// ── Context ───────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user: null,
  status: "unauthenticated",
  isLoading: false,
  signInWith: () => {},
  signOut: async () => {},
});

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("unauthenticated");

  // Restore session from localStorage on mount (stub — replace with SDK session check)
  useEffect(() => {
    const stored = localStorage.getItem("cr-auth-user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthUser;
        setUser(parsed);
        setStatus("authenticated");
      } catch {
        localStorage.removeItem("cr-auth-user");
      }
    }
  }, []);

  /**
   * Initiates a provider-specific OAuth redirect.
   * In production: replace with Clerk's `signIn.authenticateWithRedirect()`
   * or Auth0's `loginWithRedirect()`.
   */
  const signInWith = useCallback((provider: SocialProvider) => {
    setStatus("loading");
    track({ name: "social_auth_initiated", properties: { provider } });

    if (!AUTH_BASE || !AUTH_CLIENT_ID) {
      console.warn(
        "[Auth] VITE_AUTH_BASE_URL and VITE_AUTH_CLIENT_ID must be set. Auth is in stub mode.",
      );
      // Stub: simulate a successful login after 1 second for UI development
      setTimeout(() => {
        const mockUser: AuthUser = {
          id: "mock-user-001",
          email: "carlos.developer17@gmail.com",
          name: "Carlos Rangel",
          avatarUrl: undefined,
          provider,
        };
        setUser(mockUser);
        setStatus("authenticated");
        localStorage.setItem("cr-auth-user", JSON.stringify(mockUser));
      }, 1_000);
      return;
    }

    const params = new URLSearchParams({
      client_id: AUTH_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: "code",
      scope: "openid profile email",
    });

    window.location.href = `${AUTH_BASE}${PROVIDER_PATHS[provider]}?${params.toString()}`;
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    setStatus("unauthenticated");
    localStorage.removeItem("cr-auth-user");
    // Stub: call provider SDK signOut() or redirect to /auth/logout here
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        isLoading: status === "loading",
        signInWith,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
