export type IntentType = "buy" | "sell" | "both" | "rent";
export type SellTimeline = "asap" | "1_month" | "3_months" | "6_months";
export type SaleType = "auction" | "negotiation" | "deadline";
export type PreApproved = "yes" | "no";

export interface QualificationData {
  intent: IntentType;
  preApproved?: PreApproved;
  sellAddress?: string;
  sellTimeline?: SellTimeline;
  name: string;
  email: string;
  phone: string;
}

export interface PropertyListing {
  id: string;
  address: string;
  suburb: string;
  beds: number;
  baths: number;
  garage: number;
  floorArea: number;
  landArea: number;
  images: string[];
  price: string;
  description: string;
  saleType: SaleType;
  saleDate?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface TeamStat {
  label: string;
  value: string;
}

export interface ServiceArea {
  name: string;
  slug: string;
  count: number;
}

export interface TeamData {
  stats: TeamStat[];
  achievements: string[];
  members: TeamMember[];
  serviceAreas: ServiceArea[];
}

export interface BookingData {
  propertyNeeds: string;
  preferredDate: string;
  timeSlot: string;
}

export interface FunnelState {
  step: 1 | 2 | 3 | 4;
  qualification: QualificationData | null;
  booking: BookingData | null;
  leadId: string | null;
  submitted: boolean;
  bookingSubmitted: boolean;
}

export type FunnelAction =
  | { type: "SET_QUALIFICATION"; payload: QualificationData }
  | { type: "SET_LEAD_ID"; payload: string }
  | { type: "SET_BOOKING"; payload: BookingData }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "GO_TO_STEP"; payload: 1 | 2 | 3 | 4 }
  | { type: "SET_SUBMITTED" }
  | { type: "SET_BOOKING_SUBMITTED" };
