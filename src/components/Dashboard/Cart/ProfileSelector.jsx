import React from "react";

export default function ProfileSelector({
  profiles,
  selectedProfileId,
  onSelectProfile,
}) {
  if (profiles.length <= 1) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Select Profile to Order
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((prof) => (
          <button
            key={prof.id}
            onClick={() => onSelectProfile(prof.id)}
            className={`p-4 rounded-xl border-2 transition-all text-left ${
              selectedProfileId === prof.id
                ? "border-brand-primary bg-brand-primary/5 shadow-md"
                : "border-gray-200 hover:border-brand-primary/50"
            }`}
          >
            <div className="flex items-center gap-3">
              {prof.avatarUrl ? (
                <img
                  src={prof.avatarUrl}
                  alt={prof.name}
                  className={`w-12 h-12 ${
                    prof.profileType === "personal"
                      ? "rounded-full"
                      : "rounded-lg"
                  } object-cover border-2 border-gray-200`}
                />
              ) : (
                <div
                  className={`w-12 h-12 ${
                    prof.profileType === "personal"
                      ? "rounded-full"
                      : "rounded-lg"
                  } bg-gray-100 flex items-center justify-center text-2xl border-2 border-gray-200`}
                >
                  {prof.profileType === "personal" ? "👤" : "🏢"}
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{prof.name}</p>
                <p className="text-sm text-gray-600">{prof.title}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {prof.profileType === "personal"
                    ? "👤 Personal"
                    : "💼 Business"}
                </span>
              </div>
              {selectedProfileId === prof.id && (
                <div className="w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
