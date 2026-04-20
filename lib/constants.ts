import type { PropertyListing, PropertyListing2, TeamData } from "./types";

export const PROPERTY: PropertyListing = {
  id: "prop-001",
  address: "31 Wallace Road",
  suburb: "Mangere Bridge, Auckland 2022",
  beds: 4,
  baths: "2.5",
  garage: 1,
  images: [
    "/properties/31 wallace Road.avif",
  ],
  price: "Contact Agent",
  description:
    "A fantastic opportunity to secure one of these brand-new standalone homes in the highly desirable Mangere Bridge. Thoughtfully designed with modern family living in mind, these homes offer generous layouts, quality finishes, and the convenience of low-maintenance living. Perfect for families, first-home buyers, or investors looking for a solid opportunity in a well-connected location.",
  saleType: "negotiation",
  tag: "No Shared Walls - Standalone Living!",
  developmentFeatures: [
    "6 brand-new standalone homes",
    "Contemporary design with functional layouts",
    "Internal-access garages",
    "Low-maintenance outdoor spaces",
    "Quality fittings and modern finishes throughout",
  ],
  lot1Details: [
    "4 bedrooms (including 1 on ground floor — perfect for guests or extended family)",
    "Additional family room on the second floor",
    "2.5 bathrooms",
    "Internal-access garage",
    "Spacious open-plan kitchen, dining, and living area",
  ],
  lotDetails: [
    "4 bedrooms",
    "2.5 bathrooms",
    "Internal-access garage",
    "Open-plan kitchen, dining, and living",
    "Designed for comfortable family living",
  ],
  locationDetails: [
    "Mangere Bridge Village cafés, shops, and local amenities",
    "Ambury Regional Park — perfect for walking, cycling, and outdoor activities",
    "Easy motorway access to Auckland CBD and Auckland Airport",
  ],
  propertyFeatures: [
    { label: "Chattels", value: "Burglar Alarm, Dishwasher, Fixed Floor Coverings, Heat Pump, Heated Towel Rail, Light Fittings, Rangehood, Security System, Smoke Detectors, Wall Oven, Waste Disposal Unit" },
    { label: "Hot Water", value: "Electric" },
    { label: "Heating", value: "Heat Pump" },
    { label: "Insulation", value: "Ceiling" },
    { label: "Kitchen", value: "Open Plan" },
    { label: "Dining", value: "Separate Dining" },
    { label: "Exterior", value: "Weatherboard Timber" },
    { label: "Flooring", value: "Carpet, Tiles" },
    { label: "Interior Condition", value: "Excellent" },
  ],
};

export const LISTINGS: PropertyListing2[] = [
  { address: "10/21 Tennessee Avenue", image: "/properties/10-21 Tennessee Avenue.avif" },
  { address: "11/21 Tennessee Avenue", image: "/properties/11-21 Tennessee Avenue.avif" },
  { address: "14 Elsted Place", image: "/properties/14 Elsted Place.avif" },
  { address: "14/21 Tennessee Avenue", image: "/properties/14-21 Tennessee Avenue.avif" },
  { address: "2 Forbes Road", image: "/properties/2 Forbes Road.avif" },
  { address: "21 Ridgehill Rise", image: "/properties/21 Ridgehill Rise.avif" },
  { address: "21 Tennessee Avenue", image: "/properties/21 Tennessee Avenue.avif" },
  { address: "2/12 Maunu Road", image: "/properties/2-12 Maunu Road.avif" },
  { address: "2/43 Templeton Place", image: "/properties/2-43 Templeton Place.avif" },
  { address: "26A Beach Road", image: "/properties/26A Beach Road.avif" },
  { address: "30 Carruth Road", image: "/properties/30 Carruth Road.avif" },
  { address: "31 Wallace Road", image: "/properties/31 wallace Road.avif" },
  { address: "3/107 Muir Avenue", image: "/properties/3-107 Muir Avenue.avif" },
  { address: "3/23 Eden Street", image: "/properties/3-23 Eden Street.avif" },
  { address: "38 Pah Road", image: "/properties/38 Pah Road.avif" },
  { address: "4/17 Muir Avenue", image: "/properties/4-17 Muir Avenue.avif" },
  { address: "4/29 Tennessee Ave", image: "/properties/4-29 Tennessee Ave.avif" },
  { address: "4B Ahunga Road", image: "/properties/4B Ahunga Road.avif" },
  { address: "53 Kautami Avenue", image: "/properties/53 Kautami Avenue.avif" },
  { address: "5/6 Trimmer Terrace", image: "/properties/5-6 Trimmer Terrace.avif" },
  { address: "6/6 Trimmer Terrace", image: "/properties/6-6 Trimmer Terrace.avif" },
  { address: "8/21 Tennessee Avenue", image: "/properties/8-21 Tennessee Avenue.avif" },
  { address: "9/11 Albert Street", image: "/properties/9-11 Albert Street.avif" },
  { address: "A-E 121 Tui Road", image: "/properties/A-E 121 Tui Road.avif" },
  { address: "B/121 Tui Road", image: "/properties/B-121 Tui Road.avif" },
  { address: "E/121 Tui Road", image: "/properties/E-121 Tui Road.avif" },
  { address: "Lot 4/38 Pah Road", image: "/properties/Lot 4-38 Pah Road.avif" },
  { address: "Lot 4/399 Massey Road", image: "/properties/Lot 4-399 Massey Road.avif" },
];

export const TEAM: TeamData = {
  stats: [
    { label: "Years of Industry Experience", value: "5+" },
    { label: "Properties Sold", value: "600+" },
    { label: "In Total Property Sales", value: "$550M+" },
    { label: "Projects Sold", value: "100+" },
  ],
  achievements: [
    "Top 20 Sales Consultant – Northern Region (2024–2025)",
    "Top 20 Sales Consultant – Northern Region (Quarter ending Sept 2024)",
    "#3 Sales Team – South Auckland Region 2024",
    "#2 Sales Team – Papatoetoe Branch (6 months ending Sept 2023)",
    "#3 Sales Team – South Auckland Region (6 months ending Sept 2023)",
    "Diamond 400 Award – Recognising $400M in settled sales",
  ],
  members: [
    {
      name: "Esh Kohli",
      role: "Team Leader / Agent",
      photo: "/team/Eshpreet_kohli.avif",
      bio: "Top South Auckland agent with 550+ sales, $500M+ in settled results, and 100+ development projects sold. Leads a 10+ member team across Papatoetoe, Manukau, and wider South Auckland.",
    },
    {
      name: "Malka Maqbool",
      role: "Agent / Member",
      photo: "/team/Malka_maqbool.avif",
      bio: "With a background in healthcare and customer service, Malka brings compassion, trust, and deep local knowledge to every property journey in South Auckland.",
    },
    {
      name: "Avi Kumar",
      role: "Agent / Member",
      photo: "/team/Avi_kumar.avif",
      bio: "Dedicated and approachable, Avi is passionate about helping people buy, invest, or sell through clear communication and genuine care at every step.",
    },
    {
      name: "Anna Sega Poni",
      role: "Agent / Member",
      photo: "/team/Anna_Sega_poni.avif",
      bio: "Born and raised in South Auckland of proud Samoan heritage, Anna brings 26+ years of customer service and a commitment to helping clients find a place to truly call home.",
    },
    {
      name: "Vaibhav Nangia",
      role: "Agent / Member",
      photo: "/team/Vaibhab_nangia.avif",
      bio: "With 10+ years in hospitality before real estate, Vaibhav brings strong client experience and deep knowledge of South Auckland's market including new developments. Speaks English, Hindi, and Punjabi.",
    },
    {
      name: "Ranvir Sandhu",
      role: "Agent / Member",
      photo: "/team/Ranvir_sandhu.avif",
      bio: "Client-focused and driven, Ranvir delivers exceptional service through honest communication and a strong understanding of the South Auckland property market.",
    },
    {
      name: "Abhi Jain",
      role: "Agent / Member",
      photo: "/team/Abhi_jain.avif",
      bio: "Working with South Auckland's top team since 2022, Abhi specialises in residential properties, development land, and projects. Fluent in English, Punjabi, and Hindi.",
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
