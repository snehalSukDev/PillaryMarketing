import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exclusive Property Listing | Get Full Details",
  description:
    "Complete the quick form to unlock full property details, pricing, and team information.",
};

export default function FunnelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header — no distractions */}
      <header className="border-b border-gray-100 bg-white" style={{ backgroundColor: "#033663" }}>
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between" >
          <div className="flex items-center gap-2" >
            <img
              src="https://static.wixstatic.com/media/2e83dc_3b171a083a4c48dc8c43b0b28df8a2d7~mv2.png/v1/fill/w_140,h_51,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ESH%20WEBSITE1_edited.png"
              alt="Premier Real Estate"
              className="h-10 w-auto object-contain"
            />
          </div>
          <a
            href="tel:+61400000000"
            className="text-sm font-medium"
            style={{ color: "#eceff1ff" }}
          >
            Call Us: 0400 000 000
          </a>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
