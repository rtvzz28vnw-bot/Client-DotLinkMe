import React, { useState, useRef } from "react";
import {
  Check,
  ShieldCheck,
  Zap,
  RefreshCw,
  X,
  Sparkles,
  Minus,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export default function Pricing() {
  const [billing, setBilling] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const isMonthly = billing === "monthly";
  const reduceMotion = useReducedMotion();

  // parallax background
  const { scrollY } = useScroll();
  const blobY1 = useTransform(scrollY, [0, 600], [0, -80]);
  const blobY2 = useTransform(scrollY, [0, 600], [0, 60]);
  const blobY3 = useTransform(scrollY, [0, 600], [0, -40]);

  const plans = [
    {
      name: "Personal",
      desc: "For individuals who want a smart digital card.",
      monthly: 5.99,
      yearly: 59.99,
      cta: "Get Started",
      note: "Great for personal use",
      highlight: false,
      features: [
        "1 Digital Smart Card",
        "Basic Profile & Links",
        "NFC Tap Sharing",
        "Standard Analytics",
        "Email Support",
      ],
      glow: "from-[#F5A623]/35 via-[#F5A623]/12 to-transparent",
      shine: "rgba(245,166,35,0.25)",
    },
    {
      name: "Business",
      desc: "Best for creators, freelancers, and small teams.",
      monthly: 14.99,
      yearly: 149.99,
      cta: "Start Business",
      note: "Most chosen plan",
      highlight: true,
      features: [
        "Up to 10 Smart Cards",
        "Team Dashboard",
        "Advanced Analytics",
        "Custom Branding",
        "Priority Support",
      ],
      glow: "from-[#005DFF]/45 via-[#005DFF]/14 to-transparent",
      shine: "rgba(0,93,255,0.25)",
    },
    {
      name: "Enterprise",
      desc: "Full control & scale for organizations.",
      monthly: 39.99,
      yearly: 399.99,
      cta: "Contact Sales",
      note: "For large teams",
      highlight: false,
      features: [
        "Unlimited Smart Cards",
        "Admin Control Center",
        "Roles & Permissions",
        "API Integrations",
        "Dedicated Manager",
      ],
      glow: "from-emerald-400/40 via-emerald-400/12 to-transparent",
      shine: "rgba(52,211,153,0.25)",
    },
  ];

  const compare = [
    { label: "Smart Cards", p: "1", b: "10", e: "Unlimited" },
    {
      label: "Custom Branding",
      p: <Minus className="w-4 h-4" />,
      b: <Check className="w-4 h-4" />,
      e: <Check className="w-4 h-4" />,
    },
    {
      label: "Team Dashboard",
      p: <X className="w-4 h-4" />,
      b: <Check className="w-4 h-4" />,
      e: <Check className="w-4 h-4" />,
    },
    { label: "Advanced Analytics", p: "Basic", b: "Pro", e: "Pro+" },
    {
      label: "API Integrations",
      p: <X className="w-4 h-4" />,
      b: <X className="w-4 h-4" />,
      e: <Check className="w-4 h-4" />,
    },
    {
      label: "Dedicated Manager",
      p: <X className="w-4 h-4" />,
      b: <X className="w-4 h-4" />,
      e: <Check className="w-4 h-4" />,
    },
  ];

  const faqs = [
    {
      q: "Can I cancel anytime?",
      a: "Yes. You can cancel anytime from your dashboard. Your plan stays active until the end of the billing period.",
    },
    {
      q: "Can I upgrade or downgrade later?",
      a: "Absolutely. You can change your plan anytime. The difference will be prorated automatically.",
    },
    {
      q: "Do I need a physical card?",
      a: "No. You can use a digital smart card only. Physical NFC cards are optional.",
    },
    {
      q: "Is payment secure?",
      a: "Yes. Payments will be processed securely (Stripe ready whenever you want).",
    },
  ];

  const openModal = (plan) => setSelectedPlan(plan);
  const closeModal = () => setSelectedPlan(null);

  // Apple / cinematic easing
  const easeApple = [0.16, 1, 0.3, 1];

  // slower, more cinematic stagger
  const heroContainer = {
    hidden: { opacity: 0, y: 22 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 1.8, ease: easeApple, staggerChildren: 0.18 },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 1.5, ease: easeApple },
    },
  };

  const cardsContainer = {
    hidden: {},
    show: {
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.16, delayChildren: 0.12 },
    },
  };

  const cardItem = {
    hidden: { opacity: 0, y: 80, filter: "blur(12px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 1.6, ease: easeApple },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-[#0A1220] to-slate-950 overflow-hidden">
      {/* Parallax luxury background blobs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-[#005DFF]/20 blur-[140px]"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute top-20 -right-40 w-[620px] h-[620px] rounded-full bg-[#F5A623]/18 blur-[160px]"
      />
      <motion.div
        style={{ y: blobY3 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-emerald-300/15 blur-[180px]"
      />

      {/* HERO */}
      <motion.section
        variants={heroContainer}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl mx-auto px-4 pt-24 pb-12 text-center text-white"
      >
        <motion.div
          variants={heroItem}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                     bg-white/10 border border-white/10 backdrop-blur-md text-sm"
        >
          <Sparkles className="w-4 h-4 text-[#F5A623]" />
          Transparent, simple pricing
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="text-3xl md:text-5xl font-extrabold tracking-tight mt-4"
        >
          Choose a plan that <span className="text-[#F5A623]">grows</span> with
          you
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="text-white/70 mt-3 max-w-2xl mx-auto"
        >
          Simple pricing, instant activation, cancel anytime. No hidden fees.
        </motion.p>

        <motion.div
          variants={heroItem}
          className="mt-6 flex flex-wrap justify-center gap-3 text-sm"
        >
          <TrustBadge
            icon={<ShieldCheck className="w-4 h-4" />}
            text="Secure Payments"
          />
          <TrustBadge
            icon={<RefreshCw className="w-4 h-4" />}
            text="Cancel Anytime"
          />
          <TrustBadge
            icon={<Zap className="w-4 h-4" />}
            text="Instant Activation"
          />
        </motion.div>

        <motion.div variants={heroItem} className="mt-8 flex justify-center">
          <ProToggle billing={billing} setBilling={setBilling} />
        </motion.div>
      </motion.section>

      {/* PLANS */}
      <section className="relative bg-slate-50 py-14">
        <motion.div
          variants={cardsContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
          className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {plans.map((plan) => {
            const price = isMonthly ? plan.monthly : plan.yearly;
            return (
              <Card3D
                key={plan.name}
                variants={cardItem}
                plan={plan}
                price={price}
                isMonthly={isMonthly}
                openModal={openModal}
                easeApple={easeApple}
                reduceMotion={reduceMotion}
              />
            );
          })}
        </motion.div>

        {/* Compare Table */}
        <ComparisonResponsive
          compare={compare}
          easeApple={easeApple}
          reduceMotion={reduceMotion}
        />

        {/* FAQ */}
        <FAQ faqs={faqs} />
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedPlan && (
          <PlanModal
            plan={selectedPlan}
            onClose={closeModal}
            isMonthly={isMonthly}
            easeApple={easeApple}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------- 3D CARD COMPONENT (Ultra) ----------------- */
function Card3D({
  plan,
  price,
  isMonthly,
  openModal,
  variants,
  easeApple,
  reduceMotion,
}) {
  const ref = useRef(null);
  const [rot, setRot] = useState({ rx: 0, ry: 0 });

  const onMove = (e) => {
    if (!ref.current || reduceMotion) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const ry = (px - 0.5) * 10; // deeper tilt
    const rx = (0.5 - py) * 10;
    setRot({ rx, ry });
  };

  const onLeave = () => setRot({ rx: 0, ry: 0 });

  return (
    <motion.div variants={variants} className="relative">
      {/* soft gradient halo */}
      <div
        className={`absolute -inset-1 rounded-[28px] bg-gradient-to-br ${plan.glow} blur-2xl`}
      />

      {/* animated outer glow border */}
      <motion.div
        aria-hidden
        animate={reduceMotion ? {} : { opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 3.8, ease: "easeInOut", repeat: Infinity }}
        className={`absolute -inset-[2px] rounded-[30px] bg-gradient-to-br ${plan.glow}`}
      />

      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{
          transform: `perspective(1100px) rotateX(${rot.rx}deg) rotateY(${rot.ry}deg)`,
        }}
        whileHover={reduceMotion ? {} : { y: -12, scale: 1.03 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 1.1, ease: easeApple }
        }
        className={`
          relative p-8 rounded-3xl
          bg-white/92 backdrop-blur-md
          border border-slate-200
          shadow-[0_30px_85px_rgba(0,0,0,0.18)]
          hover:shadow-[0_50px_120px_rgba(0,0,0,0.28)]
          transition-shadow
          overflow-hidden
          ${
            plan.highlight
              ? "border-[#005DFF] ring-4 ring-[#005DFF]/25 shadow-[0_40px_110px_rgba(0,93,255,0.40)]"
              : ""
          }
        `}
      >
        {/* luxury shine sweep */}
        <motion.div
          aria-hidden
          initial={{ x: "-120%" }}
          animate={reduceMotion ? {} : { x: ["-120%", "120%"] }}
          transition={{ duration: 5.5, ease: "easeInOut", repeat: Infinity }}
          className="absolute inset-0 rotate-12"
          style={{
            background: `linear-gradient(90deg, transparent, ${plan.shine}, transparent)`,
            opacity: 0.6,
          }}
        />

        {/* Most Popular */}
        {plan.highlight && (
          <div
            className="
              absolute -top-4 left-1/2 -translate-x-1/2
              bg-[#005DFF] text-white text-xs font-bold
              px-4 py-1.5 rounded-full
              shadow-[0_8px_22px_rgba(0,93,255,0.65)]
              border border-white/80
              scale-110
            "
          >
            Most Popular
          </div>
        )}

        <h3 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {plan.name}
        </h3>
        <p className="text-slate-500 text-base mt-2 leading-relaxed">
          {plan.desc}
        </p>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-5xl font-extrabold text-slate-900">
            ${price}
          </span>
          <span className="text-base text-slate-500 mb-2">
            /{isMonthly ? "mo" : "yr"}
          </span>
        </div>

        <p className="text-sm text-slate-500 mt-1">
          {isMonthly
            ? "Billed monthly — upgrade anytime"
            : "Billed yearly — best value"}
        </p>

        <button
          onClick={() => openModal({ ...plan, price })}
          className={`
            mt-6 w-full py-3 rounded-2xl font-semibold text-lg transition
            ${
              plan.highlight
                ? "bg-[#005DFF] text-white hover:opacity-90 shadow-[0_9px_26px_rgba(0,93,255,0.40)]"
                : "bg-[#F5A623] text-white hover:opacity-90 shadow-[0_9px_26px_rgba(245,166,35,0.40)]"
            }
          `}
        >
          {plan.cta}
        </button>

        <p className="text-center text-sm font-semibold mt-3 text-slate-600">
          {plan.note}
        </p>

        <ul className="mt-7 space-y-4 text-base">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-slate-700">
              <Check className="w-5 h-5 mt-[3px] text-[#005DFF]" />
              <span>{f}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}

/* ---------- Toggle Pro ---------- */
function ProToggle({ billing, setBilling }) {
  const isMonthly = billing === "monthly";

  return (
    <div className="relative bg-white/10 border border-white/10 backdrop-blur-md rounded-full p-1 w-[260px] shadow-inner">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className={`absolute top-1 bottom-1 w-1/2 rounded-full bg-white shadow
          ${isMonthly ? "left-1" : "left-[50%]"}
        `}
      />
      <div className="relative grid grid-cols-2 text-sm font-semibold">
        <button
          onClick={() => setBilling("monthly")}
          className={`py-2 rounded-full transition ${
            isMonthly ? "text-slate-900" : "text-white/80 hover:text-white"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("yearly")}
          className={`py-2 rounded-full transition ${
            !isMonthly ? "text-slate-900" : "text-white/80 hover:text-white"
          }`}
        >
          Yearly <span className="text-[#F5A623]">(Save 15%)</span>
        </button>
      </div>
    </div>
  );
}

/* ---------- Small components ---------- */
function TrustBadge({ icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
      {icon}
      <span className="text-white/90">{text}</span>
    </div>
  );
}

function ComparisonResponsive({ compare, easeApple, reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 1.4, ease: easeApple }
      }
      className="max-w-5xl mx-auto mt-16 px-4"
    >
      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
        Compare Plans
      </h3>

      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl shadow border border-slate-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-4 text-left font-semibold">Feature</th>
              <th className="p-4 text-center font-semibold">Personal</th>
              <th className="p-4 text-center font-semibold">Business</th>
              <th className="p-4 text-center font-semibold">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {compare.map((row, i) => (
              <motion.tr
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 0.9, ease: easeApple, delay: i * 0.07 }
                }
                className="border-b border-slate-200 hover:bg-slate-50 transition"
              >
                <td className="p-4 text-slate-700 font-medium">{row.label}</td>
                <td className="p-4 text-center">{row.p}</td>
                <td className="p-4 text-center font-semibold text-[#005DFF]">
                  {row.b}
                </td>
                <td className="p-4 text-center">{row.e}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-3">
        {compare.map((row, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 1.0, ease: easeApple, delay: i * 0.08 }
            }
            className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm"
          >
            <div className="font-semibold text-slate-900 mb-3">{row.label}</div>

            <div className="grid grid-cols-3 gap-2 text-center text-sm">
              <div className="bg-slate-50 rounded-xl p-2">
                <div className="text-slate-500 text-xs mb-1">Personal</div>
                <div className="text-slate-900 font-medium">{row.p}</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-2 border-2 border-[#005DFF]/30">
                <div className="text-slate-500 text-xs mb-1">Business</div>
                <div className="text-[#005DFF] font-semibold">{row.b}</div>
              </div>

              <div className="bg-slate-50 rounded-xl p-2">
                <div className="text-slate-500 text-xs mb-1">Enterprise</div>
                <div className="text-slate-900 font-medium">{row.e}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function FAQ({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="max-w-4xl mx-auto mt-16 px-4">
      <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
        FAQ
      </h3>

      <div className="space-y-3">
        {faqs.map((item, i) => (
          <div
            key={i}
            className="border border-slate-200 rounded-2xl p-4 bg-white shadow-sm"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left font-semibold text-slate-900 flex justify-between items-center"
            >
              {item.q}
              <span className="text-2xl">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="text-slate-600 mt-3 text-sm leading-relaxed">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PlanModal({ plan, onClose, isMonthly, easeApple, reduceMotion }) {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={
        reduceMotion ? { duration: 0 } : { duration: 1.0, ease: easeApple }
      }
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 22 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 22 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 1.0, ease: easeApple }
        }
        className="
          w-full max-w-md rounded-3xl p-7 relative
          bg-white/92 backdrop-blur-xl
          shadow-2xl border border-white/70
        "
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>

        <h3 className="text-2xl font-extrabold text-slate-900">
          You selected {plan.name}
        </h3>
        <p className="text-slate-500 text-sm mt-1">{plan.desc}</p>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-4xl font-extrabold text-slate-900">
            ${plan.price}
          </span>
          <span className="text-sm text-slate-500 mb-1">
            /{isMonthly ? "mo" : "yr"}
          </span>
        </div>

        <ul className="mt-5 space-y-2 text-sm text-slate-700">
          {plan.features.map((f, i) => (
            <li key={i} className="flex gap-2">
              <Check className="w-4 h-4 text-[#005DFF]" />
              {f}
            </li>
          ))}
        </ul>

        <button
          onClick={() => {
            alert(`${plan.name} plan confirmed  (Stripe next step)`);
            onClose();
          }}
          className="mt-6 w-full py-3 rounded-2xl font-semibold bg-[#005DFF] text-white hover:opacity-90 shadow-[0_8px_20px_rgba(0,93,255,0.35)]"
        >
          Confirm {plan.name}
        </button>
      </motion.div>
    </motion.div>
  );
}
