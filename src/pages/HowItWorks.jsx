import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ArrowRight,
  Play,
  Zap,
  Sparkles,
  TrendingUp,
  X,
  CreditCard,
} from "lucide-react";

const HowItWorks = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const benefits = [
    { icon: CheckCircle, text: "Free account setup" },
    { icon: CheckCircle, text: "No monthly fees" },
    { icon: CheckCircle, text: "Lifetime updates" },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <section className="relative bg-brand-gradient text-white py-28 md:py-36 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-96 h-96 bg-white/5 rounded-full blur-3xl -top-48 -left-48 animate-blob" />
          <div className="absolute w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl -bottom-48 -right-48 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full mb-6 border border-white/20">
            <Sparkles size={18} className="text-brand-accent" />
            <span className="text-sm font-medium">Simple & Powerful</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            How It <span className="text-brand-accent">Works</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto leading-relaxed">
            Create your profile, tap your card, and share your world in seconds
          </p>
        </div>
      </section>

      <section className="relative py-24 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-primary px-4 py-2 rounded-full mb-4">
              <Play size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                See It In Action
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              Watch Your NFC Card{" "}
              <span className="text-brand-accent">In Action</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One tap opens your complete profile instantly, no apps required
            </p>
          </div>

          <div
            className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-blue-100
                       bg-gradient-to-br from-blue-500 to-blue-900
                       transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,102,255,0.3)]
                       hover:-translate-y-2"
          >
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full border border-white/20">
              <Zap size={14} className="text-yellow-300" />
              <span className="font-medium">Live Demo</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white text-xs px-3 py-2 rounded-full border border-white/20">
              <CreditCard size={14} />
              <span className="font-medium">NFC Enabled</span>
            </div>

            <div className="relative w-full aspect-video flex items-center justify-center bg-gradient-to-br from-blue-400/80 to-blue-900/80">
              {!isVideoPlaying ? (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="group relative bg-white/20 backdrop-blur-md w-20 h-20 md:w-28 md:h-28 rounded-full flex items-center justify-center 
                           hover:bg-white/30 transition-all shadow-2xl border border-white/30 hover:scale-110 duration-300"
                >
                  <Play
                    size={32}
                    className="text-white ml-1 group-hover:scale-110 transition-transform"
                    fill="white"
                  />
                </button>
              ) : (
                <div className="absolute inset-0 bg-black/90 flex items-center justify-center">
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-md p-2 rounded-full hover:bg-white/30 transition z-20"
                  >
                    <X size={20} className="text-white" />
                  </button>
                  <p className="text-white text-lg">Video Player Placeholder</p>
                </div>
              )}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            Replace with your actual video embed or upload
          </p>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-primary px-4 py-2 rounded-full mb-4">
              <TrendingUp size={16} />
              <span className="text-sm font-semibold uppercase tracking-wider">
                The Difference
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
              From Cards to{" "}
              <span className="text-brand-accent">Connections</span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the transformation from traditional to smart networking
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div
              className="group relative bg-gradient-to-br from-red-50 to-white rounded-3xl border-2 border-red-100 p-8 
                         transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                  <X size={14} />
                  Before
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  Traditional Way
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  Paper cards that get lost, manual typing of contact details,
                  outdated information, and no way to track connections
                </p>
              </div>
            </div>

            <div
              className="group relative bg-gradient-to-br from-blue-50 to-white rounded-3xl border-2 border-brand-primary/30 p-8 
                         transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wide">
                  <CheckCircle size={14} />
                  After
                </div>

                <h3 className="text-2xl font-bold text-brand-dark mb-3">
                  Smart NFC Way
                </h3>

                <p className="text-gray-700 leading-relaxed">
                  One tap shares everything instantly, always up-to-date
                  profile, automatic contact saving, and complete analytics
                  dashboard
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-brand-dark via-blue-900 to-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute w-96 h-96 bg-brand-accent/20 rounded-full blur-3xl top-0 left-1/4 animate-blob" />
          <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-1/4 animate-blob animation-delay-2000" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <Sparkles size={48} className="text-brand-accent mx-auto mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Networking?
          </h2>

          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands who've upgraded to smart, seamless connections
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <Link
              to="/create-card"
              className="group bg-brand-accent hover:bg-red-600 text-white
                         px-10 py-4 rounded-xl font-bold text-lg
                         transition-all transform hover:scale-105 shadow-2xl
                         inline-flex items-center justify-center gap-2"
            >
              Get Started Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/pricing"
              className="group bg-white/10 hover:bg-white/20 text-white backdrop-blur-md
                         px-10 py-4 rounded-xl font-bold text-lg border border-white/20
                         transition-all transform hover:scale-105 shadow-xl
                         inline-flex items-center justify-center gap-2"
            >
              View Pricing
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-200 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10"
                >
                  <Icon size={18} className="text-green-400" />
                  <span className="font-medium">{benefit.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
