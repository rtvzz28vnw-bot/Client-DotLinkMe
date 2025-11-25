import React, { useState } from "react";
import { Check } from "lucide-react";

export default function PricingSection() {
  const [billing, setBilling] = useState("monthly");

  const plans = [
    {
      name: "Personal",
      desc: "For individuals who want a smart digital card.",
      monthly: 5.99,
      yearly: 59.99,
      features: [
        "1 Digital Smart Card",
        "Basic Profile Links",
        "NFC Sharing",
        "Email Support",
        "Standard Analytics",
      ],
      highlight: false,
      cta: "Get Started",
    },
    {
      name: "Business",
      desc: "For small businesses and teams.",
      monthly: 14.99,
      yearly: 149.99,
      features: [
        "Up to 10 Smart Cards",
        "Team Dashboard",
        "Advanced Analytics",
        "Custom Branding",
        "Priority Support",
      ],
      highlight: true,
      cta: "Start Business",
    },
    {
      name: "Enterprise",
      desc: "Full control for large organizations.",
      monthly: 39.99,
      yearly: 399.99,
      features: [
        "Unlimited Smart Cards",
        "Admin Control",
        "API Integrations",
        "Dedicated Manager",
        "SSO Login",
      ],
      highlight: false,
      cta: "Contact Sales",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900">
            Our <span className="text-[#F5A623]">Pricing</span>
          </h2>
          <p className="text-slate-500 mt-2">
            Choose the plan that fits your needs.
          </p>

          <div className="mt-5 flex items-center justify-center">
            <div className="bg-slate-100 rounded-full p-1 flex">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  billing === "monthly"
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-500"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBilling("yearly")}
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  billing === "yearly"
                    ? "bg-white shadow text-slate-900"
                    : "text-slate-500"
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const price = billing === "monthly" ? plan.monthly : plan.yearly;

            return (
              <div
                key={plan.name}
                className={`p-6 rounded-2xl border ${
                  plan.highlight
                    ? "border-[#005DFF] shadow-xl"
                    : "border-slate-200"
                } bg-white`}
              >
                {plan.highlight && (
                  <div className="text-xs font-bold bg-[#005DFF] text-white px-3 py-1 rounded-full inline-block mb-3">
                    Most Popular
                  </div>
                )}

                <h3 className="text-2xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="text-slate-500 text-sm mt-1">{plan.desc}</p>

                <div className="mt-5 flex items-end gap-2">
                  <span className="text-4xl font-extrabold text-slate-900">
                    ${price}
                  </span>
                  <span className="text-sm text-slate-500 mb-1">
                    /{billing === "monthly" ? "mo" : "yr"}
                  </span>
                </div>

                <button
                  className={`mt-5 w-full py-2.5 rounded-xl font-semibold transition ${
                    plan.highlight
                      ? "bg-[#005DFF] text-white hover:opacity-90"
                      : "bg-[#F5A623] text-white hover:opacity-90"
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex gap-2 text-slate-700">
                      <Check className="w-4 h-4 text-[#005DFF]" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
