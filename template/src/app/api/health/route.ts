import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/**
 * Health check endpoint for monitoring
 * Returns status of database connection and environment
 */
export async function GET() {
  try {
    // Test database connection
    await db.execute("SELECT 1");

    const status = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
    };

    return NextResponse.json(status, { status: 200 });
  } catch (error) {
    const status = {
      status: "unhealthy",
      timestamp: new Date().toISOString(),
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error",
    };

    return NextResponse.json(status, { status: 503 });
  }
}
