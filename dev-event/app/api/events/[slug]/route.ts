import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { Event, IEvent } from "../../../database/event.model";

// Regex used to validate slug shape (lowercase, numbers, hyphens)
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * GET /api/events/[slug]
 * Fetch a single event by its slug.
 *
 * Responses:
 * - 200: { message, event }
 * - 400: missing/invalid slug
 * - 404: event not found
 * - 500: unexpected server error
 */
export async function GET(_req: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug: rawSlug } = await context.params;


  // Basic validation: presence and type
  if (!rawSlug || typeof rawSlug !== "string" || rawSlug.trim().length === 0) {
    return NextResponse.json({ message: "Missing or empty slug parameter." }, { status: 400 });
  }

  // Decode and normalize slug
  const slug = decodeURIComponent(rawSlug).trim().toLowerCase();

  // Validate slug shape to avoid unnecessary DB queries and injection-like values
  if (!SLUG_REGEX.test(slug)) {
    return NextResponse.json({ message: "Invalid slug format." }, { status: 400 });
  }

  try {
    await connectToDatabase();

    // Find the event by slug. Use lean() for a plain JS object result.
    const found = await Event.findOne({ slug }).select("-__v").lean().exec();

    // Type the result as a partial of IEvent (lean returns plain object)
    const event = (found as unknown) as IEvent | null;

    if (!event) {
      return NextResponse.json({ message: `Event not found for slug: ${slug}` }, { status: 404 });
    }

    return NextResponse.json({ message: "Event fetched successfully", event }, { status: 200 });
  } catch (error) {
    // Log server-side for diagnostics (do not leak internal details to clients in production)
    console.error("GET /api/events/[slug] error:", error);

    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
