"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { FunnelState, FunnelAction, QualificationData, BookingData } from "./types";

const initialState: FunnelState = {
  step: 1,
  qualification: null,
  booking: null,
  leadId: null,
  submitted: false,
  bookingSubmitted: false,
};

function funnelReducer(state: FunnelState, action: FunnelAction): FunnelState {
  switch (action.type) {
    case "SET_QUALIFICATION":
      return { ...state, qualification: action.payload };
    case "SET_LEAD_ID":
      return { ...state, leadId: action.payload };
    case "SET_BOOKING":
      return { ...state, booking: action.payload };
    case "NEXT_STEP":
      return { ...state, step: Math.min(state.step + 1, 4) as 1 | 2 | 3 | 4 };
    case "PREV_STEP":
      return { ...state, step: Math.max(state.step - 1, 1) as 1 | 2 | 3 | 4 };
    case "GO_TO_STEP":
      return { ...state, step: action.payload };
    case "SET_SUBMITTED":
      return { ...state, submitted: true };
    case "SET_BOOKING_SUBMITTED":
      return { ...state, bookingSubmitted: true };
    default:
      return state;
  }
}

interface FunnelContextValue {
  state: FunnelState;
  setQualification: (data: QualificationData) => void;
  setLeadId: (id: string) => void;
  setBooking: (data: BookingData) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: 1 | 2 | 3 | 4) => void;
  setSubmitted: () => void;
  setBookingSubmitted: () => void;
}

const FunnelContext = createContext<FunnelContextValue | null>(null);

export function FunnelProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(funnelReducer, initialState);

  return (
    <FunnelContext.Provider
      value={{
        state,
        setQualification: (data) => dispatch({ type: "SET_QUALIFICATION", payload: data }),
        setLeadId: (id) => dispatch({ type: "SET_LEAD_ID", payload: id }),
        setBooking: (data) => dispatch({ type: "SET_BOOKING", payload: data }),
        nextStep: () => dispatch({ type: "NEXT_STEP" }),
        prevStep: () => dispatch({ type: "PREV_STEP" }),
        goToStep: (step) => dispatch({ type: "GO_TO_STEP", payload: step }),
        setSubmitted: () => dispatch({ type: "SET_SUBMITTED" }),
        setBookingSubmitted: () => dispatch({ type: "SET_BOOKING_SUBMITTED" }),
      }}
    >
      {children}
    </FunnelContext.Provider>
  );
}

export function useFunnel(): FunnelContextValue {
  const ctx = useContext(FunnelContext);
  if (!ctx) throw new Error("useFunnel must be used inside FunnelProvider");
  return ctx;
}
