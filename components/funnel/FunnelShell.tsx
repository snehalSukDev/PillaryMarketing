"use client";

import { FunnelProvider, useFunnel } from "@/lib/funnel-context";
import { ProgressBar } from "./ProgressBar";
import { QualificationForm } from "./steps/QualificationForm";
import { PropertyDetails } from "./steps/PropertyDetails";
import { TeamInfo } from "./steps/TeamInfo";
import { BookingForm } from "./steps/BookingForm";

function FunnelContent() {
  const { state } = useFunnel();

  return (
    <div className="min-h-screen">
      <ProgressBar currentStep={state.step} submitted={state.submitted} />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        {state.step === 1 && <QualificationForm />}
        {state.step === 2 && <PropertyDetails />}
        {state.step === 3 && <TeamInfo />}
        {state.step === 4 && <BookingForm />}
      </div>
    </div>
  );
}

export function FunnelShell() {
  return (
    <FunnelProvider>
      <FunnelContent />
    </FunnelProvider>
  );
}
