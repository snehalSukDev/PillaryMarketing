import type { PropertyListing, TeamData } from "./types";

export const PROPERTY: PropertyListing = {
  id: "prop-001",
  address: "14 Elmwood Crescent",
  suburb: "Greenfield Heights",
  beds: 4,
  baths: 2,
  garage: 2,
  floorArea: 285,
  landArea: 612,
  images: [
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&q=80&fit=crop",
    "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&fit=crop",
  ],
  price: "$1,150,000 – $1,250,000",
  description:
    "A beautifully presented family home on a quiet tree-lined street. Featuring an open-plan living and dining area that flows seamlessly to an alfresco entertaining zone, a modern kitchen with stone benchtops, and four spacious bedrooms. The master includes a walk-in wardrobe and ensuite. Ducted air-conditioning, double lock-up garage, and beautifully landscaped gardens complete this exceptional property.",
  saleType: "auction",
  saleDate: "Saturday 17 May 2025 at 11:00am on-site",
};

export const TEAM: TeamData = {
  stats: [
    { label: "Properties Sold", value: "1,400+" },
    { label: "Years of Experience", value: "18+" },
    { label: "Avg. Days on Market", value: "19" },
    { label: "Client Satisfaction", value: "98%" },
  ],
  achievements: [
    "Top 1% Agent Nationally — 2023 & 2024",
    "REB Award — Residential Agent of the Year",
    "$950M+ in total sales volume",
    "500+ five-star client reviews",
    "Specialist in family homes & prestige listings",
  ],
  members: [
    {
      name: "James Harlow",
      role: "Principal & Lead Agent",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&fit=crop&crop=face",
      bio: "18 years of local expertise. James has sold over 900 properties and is the go-to agent for prestige listings in the area.",
    },
    {
      name: "Sarah Mitchell",
      role: "Senior Sales Agent",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80&fit=crop&crop=face",
      bio: "Sarah's warm approach and market knowledge have earned her a loyal client base. Specialist in family homes and investment properties.",
    },
    {
      name: "David Chen",
      role: "Buyer's Advocate & Negotiator",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&fit=crop&crop=face",
      bio: "David has helped over 500 buyers secure their dream home. Expert negotiator with deep knowledge of off-market opportunities.",
    },
  ],
  serviceAreas: [
    { name: "East", slug: "east", count: 14 },
    { name: "Central", slug: "central", count: 21 },
    { name: "South", slug: "south", count: 9 },
    { name: "West", slug: "west", count: 11 },
    { name: "North", slug: "north", count: 7 },
  ],
};

export const TIME_SLOTS: string[] = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

export const SELL_TIMELINE_OPTIONS = [
  { value: "asap", label: "ASAP" },
  { value: "1_month", label: "Within 1 month" },
  { value: "3_months", label: "Within 3 months" },
  { value: "6_months", label: "Within 6 months" },
] as const;

export const STEP_LABELS = ["Qualify", "Property", "Our Team", "Book Viewing"] as const;
