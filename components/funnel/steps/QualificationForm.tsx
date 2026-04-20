"use client";

import { useState } from "react";
import { useFunnel } from "@/lib/funnel-context";
import { submitLead } from "@/lib/actions";
import { SELL_TIMELINE_OPTIONS } from "@/lib/constants";
import type { IntentType, QualificationData, SellTimeline, PreApproved } from "@/lib/types";

type FormStep = "intent" | "sell_address" | "sell_timeline" | "pre_approved" | "contact";

function getSteps(intent: IntentType | null): FormStep[] {
  if (!intent || intent === "rent") return ["intent"];
  if (intent === "buy") return ["intent", "pre_approved", "contact"];
  if (intent === "sell") return ["intent", "sell_address", "sell_timeline", "contact"];
  if (intent === "both") return ["intent", "sell_address", "sell_timeline", "pre_approved", "contact"];
  return ["intent"];
}

export function QualificationForm() {
  const { setQualification, setLeadId, nextStep, setSubmitted } = useFunnel();

  const [intent, setIntent] = useState<IntentType | null>(null);
  const [rentClosed, setRentClosed] = useState(false);
  const [currentFormStep, setCurrentFormStep] = useState<FormStep>("intent");
  const [sellAddress, setSellAddress] = useState("");
  const [sellTimeline, setSellTimeline] = useState<SellTimeline | "">("");
  const [preApproved, setPreApproved] = useState<PreApproved | "">("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const steps = intent ? getSteps(intent) : ["intent" as FormStep];
  const stepIndex = steps.indexOf(currentFormStep);
  const totalSteps = intent === "rent" ? 1 : steps.length;
  const subProgress = intent && intent !== "rent" ? Math.round(((stepIndex + 1) / totalSteps) * 100) : 0;

  function handleIntentSelect(selected: IntentType) {
    setIntent(selected);
    if (selected === "rent") {
      setRentClosed(true);
    } else {
      const nextSteps = getSteps(selected);
      setCurrentFormStep(nextSteps[1]);
    }
  }

  function validateAndAdvance() {
    const newErrors: Record<string, string> = {};

    if (currentFormStep === "sell_address") {
      if (!sellAddress.trim() || sellAddress.trim().length < 5) {
        newErrors.sellAddress = "Please enter your full street address.";
      }
    } else if (currentFormStep === "sell_timeline") {
      if (!sellTimeline) {
        newErrors.sellTimeline = "Please select a timeline.";
      }
    } else if (currentFormStep === "pre_approved") {
      if (!preApproved) {
        newErrors.preApproved = "Please select an option.";
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const idx = steps.indexOf(currentFormStep);
    if (idx < steps.length - 1) {
      setCurrentFormStep(steps[idx + 1]);
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 2) newErrors.name = "Please enter your full name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Please enter a valid email address.";
    if (!phone.trim() || phone.replace(/\D/g, "").length < 7)
      newErrors.phone = "Please enter a valid phone number.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    if (!intent) {
      setServerError("Please select an intent to proceed.");
      setIsSubmitting(false);
      return;
    }

    const data: QualificationData = {
      intent,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ...(preApproved ? { preApproved } : {}),
      ...(sellAddress ? { sellAddress: sellAddress.trim() } : {}),
      ...(sellTimeline ? { sellTimeline } : {}),
    };

    let result: { success: boolean; leadId?: string; error?: string };
    try {
      result = await submitLead(data);
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

    setQualification(data);
    if (result.leadId) setLeadId(result.leadId);
    setSubmitted();
    nextStep();
  }

  if (rentClosed) {
    return (
      <div className="mx-auto max-w-lg pt-12 text-center">
        <div className="text-5xl mb-4">🏡</div>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "#1E3A5F" }}>
          Thanks for reaching out!
        </h2>
        <p className="text-gray-600 mb-6">
          We specialise in property sales. We don&apos;t handle rentals at this time, but we&apos;d
          love to help when you&apos;re ready to buy or sell.
        </p>
        <button
          onClick={() => {
            setRentClosed(false);
            setIntent(null);
            setCurrentFormStep("intent");
          }}
          className="px-6 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg pt-6">
      {/* Bait / Hook */}
      {/* <div
        className="mb-6 rounded-lg px-4 py-3 text-center text-sm font-medium"
        style={{ backgroundColor: "#f5ecd0", color: "#8B6914" }}
      >
        🔓 Complete the form to unlock exclusive property details &amp; pricing
      </div> */}

      {/* Sub-progress within Step 1 */}
      {intent && intent !== "rent" && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Form progress</span>
            <span>{subProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${subProgress}%`, backgroundColor: "#C9A84C" }}
            />
          </div>
        </div>
      )}

      {/* STEP: Intent */}
      {currentFormStep === "intent" && (
        <div>
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#1E3A5F" }}>
            What are you looking to do?
          </h1>
          <p className="text-gray-500 text-sm mb-6">Select one to get started.</p>
          <div className="grid grid-cols-2 gap-3">
            {(["buy", "sell", "both", "rent"] as IntentType[]).map((opt) => (
              <button
                key={opt}
                onClick={() => handleIntentSelect(opt)}
                className="border-2 rounded-xl py-5 px-4 text-left font-semibold capitalize hover:border-opacity-80 focus:outline-none"
                style={{
                  borderColor: intent === opt ? "#1E3A5F" : "#E2E8F0",
                  backgroundColor: intent === opt ? "#EFF4FB" : "#fff",
                  color: "#1E3A5F",
                }}
              >
                <span className="block text-xl mb-1">
                  {opt === "buy" ? "🏠" : opt === "sell" ? "🏡" : opt === "both" ? "⇄" : "🔑"}
                </span>
                {opt === "both" ? "Buy & Sell" : opt.charAt(0).toUpperCase() + opt.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP: Sell Address */}
      {currentFormStep === "sell_address" && (
        <div>
          <button
            onClick={() => setCurrentFormStep("intent")}
            className="text-sm text-gray-400 mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1E3A5F" }}>
            What&apos;s your property address?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            We&apos;ll use this to give you an accurate market appraisal.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street Address
            </label>
            <input
              type="text"
              autoComplete="street-address"
              placeholder="e.g. 14 Elm Street, Greenfield"
              value={sellAddress}
              onChange={(e) => setSellAddress(e.target.value)}
              className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
              style={{
                borderColor: errors.sellAddress ? "#EF4444" : "#E2E8F0",
                ["--tw-ring-color" as string]: "#1E3A5F",
              }}
            />
            {errors.sellAddress && (
              <p className="text-red-500 text-xs mt-1">{errors.sellAddress}</p>
            )}
          </div>
          <button
            onClick={validateAndAdvance}
            className="w-full py-3 rounded-lg font-semibold text-white mt-2"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* STEP: Sell Timeline */}
      {currentFormStep === "sell_timeline" && (
        <div>
          <button
            onClick={() => setCurrentFormStep("sell_address")}
            className="text-sm text-gray-400 mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1E3A5F" }}>
            {intent === "both"
              ? "When are you planning to sell and buy?"
              : "When are you planning to sell?"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">Select the option that best fits your plans.</p>
          <div className="flex flex-col gap-3 mb-4">
            {SELL_TIMELINE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSellTimeline(opt.value as SellTimeline)}
                className="border-2 rounded-lg py-3 px-4 text-left font-medium text-sm"
                style={{
                  borderColor: sellTimeline === opt.value ? "#1E3A5F" : "#E2E8F0",
                  backgroundColor: sellTimeline === opt.value ? "#EFF4FB" : "#fff",
                  color: "#1E3A5F",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.sellTimeline && (
            <p className="text-red-500 text-xs mb-2">{errors.sellTimeline}</p>
          )}
          <button
            onClick={validateAndAdvance}
            className="w-full py-3 rounded-lg font-semibold text-white mt-2"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* STEP: Pre-approved */}
      {currentFormStep === "pre_approved" && (
        <div>
          <button
            onClick={() => {
              const idx = steps.indexOf("pre_approved");
              setCurrentFormStep(steps[idx - 1]);
            }}
            className="text-sm text-gray-400 mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1E3A5F" }}>
            {intent === "both"
              ? "Are you pre-approved for your next home?"
              : "Are you pre-approved?"}
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            This helps us match you with the right properties and agents.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {(["yes", "no"] as PreApproved[]).map((opt) => (
              <button
                key={opt}
                onClick={() => setPreApproved(opt)}
                className="border-2 rounded-xl py-5 text-center font-semibold text-lg capitalize"
                style={{
                  borderColor: preApproved === opt ? "#1E3A5F" : "#E2E8F0",
                  backgroundColor: preApproved === opt ? "#EFF4FB" : "#fff",
                  color: "#1E3A5F",
                }}
              >
                {opt === "yes" ? "✅ Yes" : "❌ No"}
              </button>
            ))}
          </div>
          {errors.preApproved && (
            <p className="text-red-500 text-xs mb-2">{errors.preApproved}</p>
          )}
          <button
            onClick={validateAndAdvance}
            className="w-full py-3 rounded-lg font-semibold text-white mt-2"
            style={{ backgroundColor: "#1E3A5F" }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* STEP: Contact Details */}
      {currentFormStep === "contact" && (
        <form onSubmit={handleContactSubmit} noValidate>
          <button
            type="button"
            onClick={() => {
              const idx = steps.indexOf("contact");
              setCurrentFormStep(steps[idx - 1]);
            }}
            className="text-sm text-gray-400 mb-4 flex items-center gap-1"
          >
            ← Back
          </button>
          <h2 className="text-2xl font-bold mb-2" style={{ color: "#1E3A5F" }}>
            Almost there! How can we reach you?
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Submit to unlock the full property details, pricing, and our team info.
          </p>

          <div className="flex flex-col gap-4 mb-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: errors.name ? "#EF4444" : "#E2E8F0" }}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: errors.email ? "#EF4444" : "#E2E8F0" }}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone — NO autofill */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                autoComplete="off"
                name="phone-manual"
                placeholder="04XX XXX XXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2"
                style={{ borderColor: errors.phone ? "#EF4444" : "#E2E8F0" }}
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          {serverError && (
            <p className="text-red-500 text-sm mb-3 text-center">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-lg font-bold text-white text-base mt-2 disabled:opacity-60"
            style={{ backgroundColor: "#033663" }}
          >
            {isSubmitting ? "Submitting..." : "Unlock Property Details 🔓"}
          </button>

          <p className="text-xs text-center text-gray-400 mt-3">
            🔒 Your information is private and will never be shared.
          </p>
        </form>
      )}
    </div>
  );
}
