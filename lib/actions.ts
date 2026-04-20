"use server";

import type { QualificationData, BookingData } from "./types";

export async function submitLead(
  data: QualificationData
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  try {
    if (!data.name || data.name.trim().length < 2) {
      return { success: false, error: "Name must be at least 2 characters." };
    }
    if (!data.email || !/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      return { success: false, error: "Please enter a valid email address." };
    }
    if (!data.phone || data.phone.replace(/\D/g, "").length < 7) {
      return { success: false, error: "Please enter a valid phone number." };
    }
    if (!data.intent || data.intent === "rent") {
      return { success: false, error: "Invalid intent type." };
    }

    // Generate a simple lead ID (replace with DB insert in production)
    const leadId = `LEAD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    // Log to console (replace with CRM/DB call in production)
    console.log("[LEAD SUBMITTED]", { leadId, ...data, submittedAt: new Date().toISOString() });

    return { success: true, leadId };
  } catch (err) {
    console.error("[LEAD SUBMIT ERROR]", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

export async function submitBooking(
  data: BookingData & { leadId: string | null }
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!data.leadId) {
      return { success: false, error: "No lead reference found. Please complete the form first." };
    }
    if (!data.propertyNeeds || data.propertyNeeds.trim().length < 10) {
      return { success: false, error: "Please describe your property needs (min 10 characters)." };
    }
    if (data.propertyNeeds.trim().length > 500) {
      return { success: false, error: "Property needs description must be 500 characters or less." };
    }
    if (!data.preferredDate) {
      return { success: false, error: "Please select a preferred date." };
    }
    // Validate date is in the future
    const selected = new Date(data.preferredDate + "T00:00:00");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 60);
    if (selected < tomorrow || selected > maxDate) {
      return { success: false, error: "Please select a date between tomorrow and 60 days from now." };
    }
    if (!data.timeSlot) {
      return { success: false, error: "Please select a time slot." };
    }

    // Log to console (replace with CRM/calendar integration in production)
    console.log("[BOOKING SUBMITTED]", { ...data, submittedAt: new Date().toISOString() });

    return { success: true };
  } catch (err) {
    console.error("[BOOKING SUBMIT ERROR]", err);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
