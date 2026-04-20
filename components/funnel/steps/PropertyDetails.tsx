"use client";

import Image from "next/image";
import { useFunnel } from "@/lib/funnel-context";
import { PROPERTY } from "@/lib/constants";

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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: "🛏", label: "Bedrooms", value: p.beds },
          { icon: "🚿", label: "Bathrooms", value: p.baths },
          { icon: "🚗", label: "Garage", value: `${p.garage} car` },
          { icon: "📐", label: "Floor Area", value: `${p.floorArea} m²` },
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

      {/* Land Area */}
      <div
        className="text-sm text-gray-600 mb-6 flex gap-4 flex-wrap border rounded-xl p-3"
        style={{ borderColor: "#E2E8F0" }}
      >
        <span>
          🌿 <strong>Land Area:</strong> {p.landArea} m²
        </span>
        <span>
          📍 <strong>Suburb:</strong> {p.suburb}
        </span>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-base font-bold mb-2" style={{ color: "#1E3A5F" }}>
          About this Property
        </h2>
        <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-3">
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
    </div>
  );
}
