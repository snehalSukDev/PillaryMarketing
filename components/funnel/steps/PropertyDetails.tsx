"use client";

import Image from "next/image";
import { useFunnel } from "@/lib/funnel-context";
import { PROPERTY, LISTINGS } from "@/lib/constants";

const saleTypeLabel: Record<string, string> = {
  auction: "Auction",
  negotiation: "Private Negotiation",
  deadline: "Deadline Sale",
};

const saleTypeBg: Record<string, string> = {
  auction: "#1E3A5F",
  negotiation: "#2D6A4F",
  deadline: "#7B2D8B",
};

export function PropertyDetails() {
  const { goToStep, nextStep } = useFunnel();
  const p = PROPERTY;

  return (
    <div className="mx-auto max-w-3xl pt-4">
      {/* Header */}
      <div className="mb-4">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="text-xs font-bold px-3 py-1 rounded-full text-white uppercase tracking-wide"
            style={{ backgroundColor: saleTypeBg[p.saleType] }}
          >
            {saleTypeLabel[p.saleType]}
          </span>
          {p.saleDate && (
            <span className="text-xs text-gray-500 font-medium">{p.saleDate}</span>
          )}
        </div>
        <h1 className="text-2xl font-bold leading-tight" style={{ color: "#1E3A5F" }}>
          {p.address}
        </h1>
        <p className="text-gray-500 text-sm">{p.suburb}</p>
      </div>

      {/* Hero Image */}
      <div className="relative w-full rounded-xl overflow-hidden mb-3" style={{ aspectRatio: "16/9" }}>
        <Image
          src={p.images[0]}
          alt={`${p.address} - main view`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* Thumbnail gallery */}
      {p.images.length > 1 && (
        <div className="grid grid-cols-4 gap-2 mb-6">
          {p.images.slice(1, 5).map((src, i) => (
            <div
              key={i}
              className="relative rounded-lg overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={src}
                alt={`${p.address} - photo ${i + 2}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 192px"
              />
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <div
        className="rounded-xl p-4 mb-5 flex items-center justify-between"
        style={{ backgroundColor: "#f5ecd0" }}
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-amber-800">
            Price Guide
          </p>
          <p className="text-2xl font-bold mt-0.5" style={{ color: "#1E3A5F" }}>
            {p.price}
          </p>
        </div>
        <button
          onClick={() => goToStep(4)}
          className="px-5 py-2.5 rounded-lg font-bold text-white text-sm whitespace-nowrap"
          style={{ backgroundColor: "#C9A84C" }}
        >
          Book Private Viewing
        </button>
      </div>

      {/* Key Details */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { icon: "🛏", label: "Bedrooms", value: p.beds },
          { icon: "🚿", label: "Bathrooms", value: p.baths },
          { icon: "🚗", label: "Garage", value: `${p.garage} car` },
        ].map((item) => (
          <div
            key={item.label}
            className="border rounded-xl p-3 text-center"
            style={{ borderColor: "#E2E8F0" }}
          >
            <span className="text-2xl">{item.icon}</span>
            <p className="text-lg font-bold mt-1" style={{ color: "#1E3A5F" }}>
              {item.value}
            </p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Tag */}
      {p.tag && (
        <div
          className="rounded-xl px-4 py-2.5 mb-5 text-sm font-bold text-center"
          style={{ backgroundColor: "#033663", color: "#fff" }}
        >
          {p.tag}
        </div>
      )}

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-base font-bold mb-2" style={{ color: "#1E3A5F" }}>
          About this Property
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
      </div>

      {/* Development Features */}
      {p.developmentFeatures && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2" style={{ color: "#1E3A5F" }}>
            Development Features
          </h2>
          <ul className="flex flex-col gap-1.5">
            {p.developmentFeatures.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-amber-500 font-bold shrink-0">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lot 1 */}
      {p.lot1Details && (
        <div className="mb-5 border rounded-xl p-4" style={{ borderColor: "#E2E8F0" }}>
          <h3 className="text-sm font-bold mb-2" style={{ color: "#1E3A5F" }}>
            Lot 1 — Ideal for Flexible Family Living
          </h3>
          <ul className="flex flex-col gap-1.5">
            {p.lot1Details.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-0.5 text-amber-500 font-bold shrink-0">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Lots 2-6 */}
      {p.lotDetails && (
        <div className="mb-6 border rounded-xl p-4" style={{ borderColor: "#E2E8F0" }}>
          <h3 className="text-sm font-bold mb-2" style={{ color: "#1E3A5F" }}>
            Lots 2–6 — Modern & Practical Layout
          </h3>
          <ul className="flex flex-col gap-1.5">
            {p.lotDetails.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="mt-0.5 text-amber-500 font-bold shrink-0">•</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Location */}
      {p.locationDetails && (
        <div className="mb-6">
          <h2 className="text-base font-bold mb-2" style={{ color: "#1E3A5F" }}>
            Great Mangere Bridge Location
          </h2>
          <ul className="flex flex-col gap-1.5">
            {p.locationDetails.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="mt-0.5 text-amber-500 font-bold shrink-0">📍</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Property Features */}
      {p.propertyFeatures && (
        <div className="mb-8">
          <h2 className="text-base font-bold mb-3" style={{ color: "#1E3A5F" }}>
            Property Features
          </h2>
          <div className="rounded-xl overflow-hidden border" style={{ borderColor: "#E2E8F0" }}>
            {p.propertyFeatures.map((f, i) => (
              <div
                key={f.label}
                className="grid grid-cols-2 px-4 py-2.5 text-xs gap-3"
                style={{ backgroundColor: i % 2 === 0 ? "#F8F9FA" : "#fff", borderTop: i > 0 ? "1px solid #E2E8F0" : undefined }}
              >
                <span className="font-semibold" style={{ color: "#1E3A5F" }}>{f.label}</span>
                <span className="text-gray-500">{f.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3 mb-10">
        <button
          onClick={() => goToStep(4)}
          className="flex-1 py-4 rounded-xl font-bold text-white text-base"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          📅 Book a Private Viewing
        </button>
        <button
          onClick={nextStep}
          className="flex-1 py-4 rounded-xl font-semibold text-base border-2"
          style={{ borderColor: "#1E3A5F", color: "#1E3A5F", backgroundColor: "#fff" }}
        >
          Meet Our Team →
        </button>
      </div>

      {/* List of Properties */}
      <div className="mb-8">
        <h2 className="text-base font-bold mb-1" style={{ color: "#1E3A5F" }}>
          More Properties
        </h2>
        <p className="text-xs text-gray-500 mb-4">Explore other listings from our portfolio across Auckland.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {LISTINGS.map((listing) => (
            <div
              key={listing.address}
              className="rounded-xl overflow-hidden border group cursor-pointer"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
                <Image
                  src={listing.image}
                  alt={listing.address}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
              <div className="px-3 py-2" style={{ backgroundColor: "#F8F9FA" }}>
                <p className="text-xs font-semibold leading-snug" style={{ color: "#1E3A5F" }}>
                  {listing.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
