/**
 * Simple in-memory rate limiter
 * For production, use Redis or a dedicated rate limiting service
 */

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

/**
 * Rate limit configuration
 */
export interface RateLimitConfig {
  /** Unique identifier (e.g., IP address, user ID) */
  identifier: string;
  /** Maximum requests allowed */
  limit: number;
  /** Window duration in milliseconds */
  window: number;
}

/**
 * Check if request is rate limited
 * @returns true if allowed, false if rate limited
 */
export function rateLimit(config: RateLimitConfig): {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
} {
  const { identifier, limit, window } = config;
  const now = Date.now();

  // Get or create entry
  if (!store[identifier] || store[identifier].resetTime < now) {
    store[identifier] = {
      count: 1,
      resetTime: now + window,
    };
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: store[identifier].resetTime,
    };
  }

  // Increment count
  store[identifier].count++;

  // Check if over limit
  if (store[identifier].count > limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: store[identifier].resetTime,
    };
  }

  return {
    success: true,
    limit,
    remaining: limit - store[identifier].count,
    reset: store[identifier].resetTime,
  };
}

/**
 * Clean up expired entries (call periodically)
 */
export function cleanupRateLimitStore() {
  const now = Date.now();
  for (const key in store) {
    if (store[key] && store[key].resetTime < now) {
      delete store[key];
    }
  }
}

// Clean up every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(cleanupRateLimitStore, 5 * 60 * 1000);
}

/**
 * Get client IP from request
 */
export function getClientIp(request: Request): string {
  // Try to get real IP from headers (when behind proxy)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const ip = forwarded.split(",")[0]?.trim();
    if (ip) return ip;
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback
  return "unknown";
}
