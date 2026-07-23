/**
 * PlayPro Integration Surface (stub)
 * ----------------------------------
 * This file defines the shape of every integration point the UI will need
 * once PlayPro's technical documentation is reviewed. Nothing here executes
 * real network calls — every function is a typed placeholder so the
 * production team can implement the actual strategy (REST, GraphQL,
 * webhooks, embedded widget, or redirect flow) without touching any UI
 * component. Components should only ever import from this file, never
 * call PlayPro directly.
 *
 * Swap the mock body of each function for a real call once a strategy is
 * confirmed. The exported type signatures are the contract the UI already
 * assumes today.
 */

export type IntegrationStrategy =
  | "rest"
  | "graphql"
  | "webhook"
  | "embedded_widget"
  | "redirect_flow";

export interface CourtAvailability {
  courtId: string;
  date: string;
  slots: { time: string; available: boolean }[];
}

export interface BookingPayload {
  courtId: string;
  date: string;
  time: string;
  coachId?: string;
  teaming?: "full" | "need1" | "need2" | "join" | "waitlist";
  paymentMethod: "credits" | "card" | "bank";
}

export interface BookingResult {
  bookingId: string;
  status: "confirmed" | "pending" | "failed";
  remainingBalance?: number;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  walletBalance?: number;
}

// --- Court & Booking -------------------------------------------------

export async function getCourtAvailability(_courtId: string, _date: string): Promise<CourtAvailability> {
  throw new Error("Not implemented — pending PlayPro API review");
}

export async function createBooking(_payload: BookingPayload): Promise<BookingResult> {
  throw new Error("Not implemented — pending PlayPro API review");
}

export async function updateBooking(_bookingId: string, _payload: Partial<BookingPayload>): Promise<BookingResult> {
  throw new Error("Not implemented — pending PlayPro API review");
}

export async function cancelBooking(_bookingId: string): Promise<{ success: boolean }> {
  throw new Error("Not implemented — pending PlayPro API review");
}

// --- Customer & Wallet -------------------------------------------------

export async function getCustomerProfile(_customerId: string): Promise<CustomerProfile> {
  throw new Error("Not implemented — pending PlayPro API review");
}

/**
 * Returns wallet/club-credit balance IF PlayPro exposes it.
 * If PlayPro has no such API, this module stays isolated and the
 * Wallet & Club Credits UI can be hidden or replaced without touching
 * any other part of the site.
 */
export async function getWalletBalance(_customerId: string): Promise<{ balance: number } | null> {
  throw new Error("Not implemented — pending PlayPro API review");
}

// --- Notifications -------------------------------------------------

export async function sendNotification(_customerId: string, _type: string, _payload: Record<string, unknown>): Promise<void> {
  throw new Error("Not implemented — pending PlayPro API review");
}