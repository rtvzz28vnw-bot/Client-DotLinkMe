import React from "react";
import { User, Briefcase } from "lucide-react";

const PROFILE_TYPES = [
  {
    id: "personal",
    label: "Personal Profile",
    icon: <User className="w-4 h-4" />,
  },
  {
    id: "business",
    label: "Business Profile",
    icon: <Briefcase className="w-4 h-4" />,
  },
];

export default function ProfileTypeSwitch({ profileType, onSwitch }) {
  return (
    <div
      className="flex flex-wrap justify-center gap-4 mb-10"
      data-aos="fade-up"
    >
      {PROFILE_TYPES.map((type) => (
        <button
          key={type.id}
          type="button"
          onClick={() => onSwitch(type.id)}
          className={`btn-ghost-clean px-8 py-3 rounded-2xl text-sm md:text-base transition-all flex items-center gap-2 justify-center ${
            profileType === type.id
              ? "bg-brand-primary text-white border-brand-primary shadow-md"
              : "hover:border-brand-primary/40"
          }`}
        >
          {type.icon} {type.label}
        </button>
      ))}
    </div>
  );
}
