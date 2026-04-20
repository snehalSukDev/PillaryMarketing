"use client";

import Image from "next/image";
import { useFunnel } from "@/lib/funnel-context";
import { TEAM } from "@/lib/constants";

export function TeamInfo() {
  const { goToStep, prevStep } = useFunnel();

  return (
    <div className="mx-auto max-w-3xl pt-4">
      {/* Back */}
      <button
        onClick={prevStep}
        className="text-sm text-gray-400 mb-6 flex items-center gap-1"
      >
        ← Back to Property
      </button>

      <h1 className="text-2xl font-bold mb-1" style={{ color: "#1E3A5F" }}>
        Meet Our Team
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Award-winning local experts with a proven track record.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {TEAM.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-4 text-center border"
            style={{ borderColor: "#E2E8F0", backgroundColor: "#F8F9FA" }}
          >
            <p className="text-3xl font-extrabold leading-none" style={{ color: "#1E3A5F" }}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-1 leading-snug">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Achievements */}
      <div className="mb-8">
        <h2 className="text-base font-bold mb-3" style={{ color: "#1E3A5F" }}>
          🏆 Achievements
        </h2>
        <ul className="flex flex-col gap-2">
          {TEAM.achievements.map((a) => (
            <li key={a} className="flex items-start gap-2 text-sm text-gray-700">
              <span
                className="mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
                style={{ backgroundColor: "#C9A84C" }}
              >
                ✓
              </span>
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Team Members */}
      <div className="mb-8">
        <h2 className="text-base font-bold mb-4" style={{ color: "#1E3A5F" }}>
          Our Agents
        </h2>
        <div className="flex flex-col gap-4">
          {TEAM.members.map((member) => (
            <div
              key={member.name}
              className="flex items-start gap-4 border rounded-xl p-4"
              style={{ borderColor: "#E2E8F0" }}
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-gray-100">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <p className="font-bold text-sm" style={{ color: "#1E3A5F" }}>
                  {member.name}
                </p>
                <p
                  className="text-xs font-medium mb-1"
                  style={{ color: "#C9A84C" }}
                >
                  {member.role}
                </p>
                <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Areas */}
      <div className="mb-8">
        <h2 className="text-base font-bold mb-3" style={{ color: "#1E3A5F" }}>
          Properties Available In
        </h2>
        <div className="flex flex-wrap gap-2">
          {TEAM.serviceAreas.map((area) => (
            <button
              key={area.slug}
              className="border-2 rounded-full px-4 py-1.5 text-sm font-medium flex items-center gap-1.5"
              style={{ borderColor: "#1E3A5F", color: "#1E3A5F" }}
              type="button"
            >
              📍 {area.name}
              <span
                className="text-xs px-1.5 py-0.5 rounded-full text-white font-bold"
                style={{ backgroundColor: "#C9A84C" }}
              >
                {area.count}
              </span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">Homes for sale in each area</p>
      </div>

      {/* Book CTA */}
      <div
        className="rounded-xl p-5 text-center"
        style={{ backgroundColor: "#EFF4FB" }}
      >
        <h3 className="font-bold text-lg mb-1" style={{ color: "#1E3A5F" }}>
          Ready to see the property?
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Book a private viewing with one of our agents at a time that suits you.
        </p>
        <button
          onClick={() => goToStep(4)}
          className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white text-base"
          style={{ backgroundColor: "#1E3A5F" }}
        >
          📅 Book a Private Viewing
        </button>
      </div>
    </div>
  );
}
