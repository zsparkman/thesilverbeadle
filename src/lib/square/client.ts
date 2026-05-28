import "server-only";
import { SquareClient, SquareEnvironment } from "square";

/**
 * Singleton Square SDK client. Returns null if env vars are missing, so the
 * rest of the app can transparently fall back to hardcoded product data while
 * you finish wiring up your Square account.
 */
let cached: SquareClient | null | undefined;

export function getSquareClient(): SquareClient | null {
  if (cached !== undefined) return cached;

  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) {
    cached = null;
    return null;
  }

  const env = process.env.SQUARE_ENVIRONMENT === "production"
    ? SquareEnvironment.Production
    : SquareEnvironment.Sandbox;

  cached = new SquareClient({ token, environment: env });
  return cached;
}

export function isSquareConfigured(): boolean {
  return Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
}
