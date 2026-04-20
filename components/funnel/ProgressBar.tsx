"use client";

import { STEP_LABELS } from "@/lib/constants";

interface ProgressBarProps {
  currentStep: 1 | 2 | 3 | 4;
  submitted: boolean;
}

export function ProgressBar({ currentStep, submitted }: ProgressBarProps) {
  return (
    <div className="w-full py-4 px-4">
      <div className="mx-auto max-w-xl">
        <div className="flex items-center justify-between">
          {STEP_LABELS.map((label, index) => {
            const stepNum = (index + 1) as 1 | 2 | 3 | 4;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            // Steps 2-4 are locked until form is submitted (step 1 complete)
            const isLocked = stepNum > 1 && !submitted && !isActive && !isCompleted;

            return (
              <div key={label} className="flex flex-1 items-center">
                {/* Step circle */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0"
                    style={{
                      backgroundColor: isCompleted
                        ? "#1E3A5F"
                        : isActive
                          ? "#033663"
                          : "#E2E8F0",
                      borderColor: isCompleted
                        ? "#1E3A5F"
                        : isActive
                          ? "#C9A84C"
                          : "#E2E8F0",
                      color: isCompleted || isActive ? "#fff" : "#94A3B8",
                    }}
                  >
                    {isCompleted ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      stepNum
                    )}
                  </div>
                  <span
                    className="mt-1 text-xs font-medium hidden sm:block"
                    style={{
                      color: isActive ? "#1E3A5F" : isCompleted ? "#1E3A5F" : "#94A3B8",
                    }}
                  >
                    {label}
                  </span>
                  {/* Lock indicator for steps not yet accessible */}
                  {isLocked && (
                    <span className="mt-1 text-xs text-gray-400 hidden sm:block">🔒</span>
                  )}
                </div>
                {/* Connector line between steps */}
                {index < STEP_LABELS.length - 1 && (
                  <div
                    className="flex-1 h-0.5 mx-1"
                    style={{
                      backgroundColor: stepNum < currentStep ? "#1E3A5F" : "#E2E8F0",
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
