import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

/**
 * Email allowlist - only these emails can register/login
 * Set via env: ALLOWED_EMAILS="email1@example.com,email2@example.com"
 * If not set, allows all emails (useful for development)
 */
const ALLOWED_EMAILS = process.env.ALLOWED_EMAILS
  ? process.env.ALLOWED_EMAILS.split(",").map((e) => e.trim().toLowerCase())
  : [];

function isEmailAllowed(email: string): boolean {
  // If no allowlist configured, allow all (for development)
  if (ALLOWED_EMAILS.length === 0) {
    return true;
  }
  return ALLOWED_EMAILS.includes(email.toLowerCase());
}

/**
 * BetterAuth configuration
 *
 * Email Integration:
 * This template uses console logging for email verification and password reset.
 * For production, replace sendVerificationEmail and sendResetPassword with a real email service:
 *
 * Popular options:
 * - Resend (https://resend.com) - Modern, developer-friendly
 * - SendGrid (https://sendgrid.com) - Enterprise-grade
 * - Mailgun (https://www.mailgun.com) - Reliable, scalable
 * - Amazon SES (https://aws.amazon.com/ses) - Cost-effective at scale
 *
 * Example with Resend:
 * ```ts
 * import { Resend } from 'resend';
 * const resend = new Resend(process.env.RESEND_API_KEY);
 *
 * sendVerificationEmail: async ({ user, url }) => {
 *   await resend.emails.send({
 *     from: 'noreply@yourdomain.com',
 *     to: user.email,
 *     subject: 'Verify your email',
 *     html: `<p>Click <a href="${url}">here</a> to verify your email.</p>`
 *   });
 * }
 * ```
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      // TODO: Replace with real email service for production
      // For development, check your terminal for the reset link
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("\n" + "=".repeat(60));
        // eslint-disable-next-line no-console
        console.log("PASSWORD RESET REQUEST");
        // eslint-disable-next-line no-console
        console.log(`User: ${user.email}`);
        // eslint-disable-next-line no-console
        console.log(`Reset URL: ${url}`);
        // eslint-disable-next-line no-console
        console.log("=".repeat(60) + "\n");
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url }) => {
      // TODO: Replace with real email service for production
      // For development, check your terminal for the verification link
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("\n" + "=".repeat(60));
        // eslint-disable-next-line no-console
        console.log("EMAIL VERIFICATION");
        // eslint-disable-next-line no-console
        console.log(`User: ${user.email}`);
        // eslint-disable-next-line no-console
        console.log(`Verification URL: ${url}`);
        // eslint-disable-next-line no-console
        console.log("=".repeat(60) + "\n");
      }
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(
        process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ),
    },
  },
  // Database hooks - check allowlist before user creation
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (!isEmailAllowed(user.email)) {
            throw new Error("This email address is not allowed to register");
          }
          return { data: user };
        },
      },
    },
  },
});
