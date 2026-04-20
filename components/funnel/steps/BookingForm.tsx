"use client";

import { useState } from "react";
import { useFunnel } from "@/lib/funnel-context";
import { submitBooking } from "@/lib/actions";
import { TIME_SLOTS } from "@/lib/constants";

function getTomorrowDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split("T")[0];
}

function getMaxDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().split("T")[0];
}

export function BookingForm() {
  const { state, prevStep, setBooking, setBookingSubmitted } = useFunnel();

  const [propertyNeeds, setPropertyNeeds] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const charCount = propertyNeeds.length;

  if (state.bookingSubmitted) {
    // Read from context so confirmation persists on remount
    const confirmedDate = state.booking?.preferredDate;
    const confirmedSlot = state.booking?.timeSlot;
    return (
      <div className="mx-auto max-w-lg pt-12 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#1E3A5F" }}>
          Viewing Request Received!
        </h2>
        <p className="text-gray-600 mb-2">
          Thank you{state.qualification?.name ? `, ${state.qualification.name.split(" ")[0]}` : ""}!
          Our team will be in touch shortly to confirm your viewing time.
        </p>
        {confirmedSlot && confirmedDate && (
          <div
            className="inline-block rounded-xl px-6 py-4 mt-4 text-sm"
            style={{ backgroundColor: "#EFF4FB" }}
          >
            <p className="font-semibold" style={{ color: "#1E3A5F" }}>
              📅 {new Date(confirmedDate + "T00:00:00").toLocaleDateString("en-AU", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-500 mt-1">🕐 {confirmedSlot}</p>
          </div>
        )}
        <p className="text-xs text-gray-400 mt-6">
          A confirmation will be sent to {state.qualification?.email || "your email address"}.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!propertyNeeds.trim() || propertyNeeds.trim().length < 10)
      newErrors.propertyNeeds = "Please describe your needs (min 10 characters).";
    if (propertyNeeds.trim().length > 500)
      newErrors.propertyNeeds = "Max 500 characters.";
    if (!preferredDate) newErrors.preferredDate = "Please select a date.";
    if (!timeSlot) newErrors.timeSlot = "Please select a time slot.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    const bookingData = { propertyNeeds: propertyNeeds.trim(), preferredDate, timeSlot };

    let result: { success: boolean; error?: string };
    try {
      result = await submitBooking({ ...bookingData, leadId: state.leadId });
    } catch {
      setIsSubmitting(false);
      setServerError("Connection error. Please check your network and try again.");
      return;
    }
    setIsSubmitting(false);

    if (!result.success) {
      setServerError(result.error || "Something went wrong. Please try again.");
      return;
    }

    setBooking(bookingData);
    setBookingSubmitted();
  }

  return (
    <div className="mx-auto max-w-lg pt-4">
      <button
        type="button"
        onClick={prevStep}
        className="text-sm text-gray-400 mb-6 flex items-center gap-1"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-1" style={{ color: "#1E3A5F" }}>
        Book a Private Viewing
      </h1>
      <p className="text-gray-500 text-sm mb-6">
        Tell us what you&apos;re looking for and pick a time that works for you.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Property needs */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What are your property needs?
          </label>
          <textarea
            rows={4}
            maxLength={500}
            placeholder="e.g. Looking for a family home with 4 bedrooms, a large backyard, and close to good schools..."
            value={propertyNeeds}
            onChange={(e) => setPropertyNeeds(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none resize-none"
            style={{ borderColor: errors.propertyNeeds ? "#EF4444" : "#E2E8F0" }}
          />
          <div className="flex justify-between mt-1">
            {errors.propertyNeeds ? (
              <p className="text-red-500 text-xs">{errors.propertyNeeds}</p>
            ) : (
              <span />
            )}
            <span className="text-xs text-gray-400">{charCount}/500</span>
          </div>
        </div>

        {/* Date picker */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Viewing Date
          </label>
          <input
            type="date"
            min={getTomorrowDate()}
            max={getMaxDate()}
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none"
            style={{ borderColor: errors.preferredDate ? "#EF4444" : "#E2E8F0" }}
          />
          {errors.preferredDate && (
            <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>
          )}
        </div>

        {/* Time slots */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <div className="grid grid-cols-4 gap-2">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setTimeSlot(slot)}
                className="border rounded-lg py-2 text-xs font-medium text-center"
                style={{
                  borderColor: timeSlot === slot ? "#1E3A5F" : "#E2E8F0",
                  backgroundColor: timeSlot === slot ? "#EFF4FB" : "#fff",
                  color: timeSlot === slot ? "#1E3A5F" : "#64748B",
                  fontWeight: timeSlot === slot ? 700 : 500,
                }}
              >
                {slot}
              </button>
            ))}
          </div>
          {errors.timeSlot && (
            <p className="text-red-500 text-xs mt-2">{errors.timeSlot}</p>
          )}
        </div>

        {serverError && (
          <p className="text-red-500 text-sm mb-3 text-center">{serverError}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl font-bold text-white text-base disabled:opacity-60"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          {isSubmitting ? "Submitting..." : "Confirm Viewing Request →"}
        </button>

        <p className="text-xs text-center text-gray-400 mt-3">
          Our team will contact you within 2 business hours to confirm.
        </p>
      </form>
    </div>
  );
}
