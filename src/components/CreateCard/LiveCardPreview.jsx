import React, { useEffect, useState } from "react";
import {
  User,
  Building,
  Zap,
  Briefcase,
  Sparkles,
  Loader2,
} from "lucide-react";

function generateProfileUrl(name) {
  if (!name || !name.trim()) return "https://linkme.io/your-smart-identity";
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  return `https://linkme.io/${slug}`;
}

function adjustColorBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0xff) + amt;
  const B = (num & 0xff) + amt;
  return (
    "#" +
    (
      0x1000000 +
      (Math.min(255, Math.max(0, R)) << 16) +
      (Math.min(255, Math.max(0, G)) << 8) +
      Math.min(255, Math.max(0, B))
    )
      .toString(16)
      .slice(1)
  );
}

function getTemplateStyles(selectedTemplate, currentProfile) {
  console.log("🔍 [PREVIEW] getTemplateStyles called");
  console.log("🔍 [PREVIEW] selectedTemplate:", selectedTemplate);
  console.log(
    "🔍 [PREVIEW] currentProfile.designMode:",
    currentProfile.designMode
  );
  console.log(
    "🔍 [PREVIEW] currentProfile.aiBackground:",
    currentProfile.aiBackground
  );
  console.log(
    "🔍 [PREVIEW] currentProfile.customDesignUrl:",
    currentProfile.customDesignUrl
  );

  // PRIORITY 1: Custom Design (highest priority)
  if (currentProfile.customDesignUrl) {
    console.log("✅ [PREVIEW] Using custom design URL");
    return {
      style: {
        backgroundImage: `url(${currentProfile.customDesignUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      textColor: "text-white",
      overlay: "from-black/60 to-black/30",
    };
  }

  // PRIORITY 2: AI Background
  if (currentProfile.designMode === "ai" && currentProfile.aiBackground) {
    console.log(
      "✅ [PREVIEW] Using AI background:",
      currentProfile.aiBackground
    );
    return {
      style: {
        backgroundImage: `url(${currentProfile.aiBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      textColor: "text-white",
      overlay: "from-black/40 to-black/20",
    };
  }

  // PRIORITY 3: Manual mode with templates
  if (currentProfile.designMode === "manual") {
    console.log("✅ [PREVIEW] Using manual template:", selectedTemplate);
    const color = currentProfile.color || "#2563eb";

    switch (selectedTemplate) {
      case "gradient":
        return {
          style: {
            background: `linear-gradient(135deg, ${color} 0%, ${adjustColorBrightness(
              color,
              -30
            )} 100%)`,
          },
          textColor: "text-white",
          overlay: "from-black/10 to-transparent",
        };

      case "glass":
        return {
          style: {
            background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
            backdropFilter: "blur(20px)",
          },
          className: "border-2 backdrop-blur-xl",
          textColor: "text-gray-800",
          borderColor: color + "40",
        };

      case "dark":
        return {
          style: {
            background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, ${color}20 100%)`,
          },
          textColor: "text-white",
          overlay: "from-transparent via-black/20 to-transparent",
        };

      case "neon":
        return {
          style: {
            background: `linear-gradient(135deg, #000000 0%, #1a1a2e 100%)`,
            boxShadow: `0 0 30px ${color}40, inset 0 0 50px ${color}10`,
          },
          className: "border-2",
          textColor: "text-white",
          borderColor: color,
          glow: color,
        };

      case "elegant":
        return {
          style: {
            background: `linear-gradient(to bottom right, ${color} 0%, ${adjustColorBrightness(
              color,
              -20
            )} 50%, ${adjustColorBrightness(color, 10)} 100%)`,
          },
          textColor: "text-white",
          overlay: "from-white/5 to-transparent",
        };

      default:
        // "modern" template
        return {
          style: { backgroundColor: color },
          textColor: "text-white",
          overlay: "from-black/5 to-transparent",
        };
    }
  }

  console.log("⚠️ [PREVIEW] Using fallback default gradient");
  // FALLBACK: Default gradient if nothing matches
  return {
    style: {},
    className:
      "bg-gradient-to-br from-brand-primary/90 via-[#0B0F19] to-[#16203A]",
    textColor: "text-white",
    overlay: "from-black/10 to-transparent",
  };
}

/* ============================================================
   CardPreview - WITH LOADING INDICATOR
============================================================ */
function CardPreview({ profileType, currentProfile, selectedTemplate }) {
  const isPersonal = profileType === "personal";
  const templateStyles = getTemplateStyles(selectedTemplate, currentProfile);

  const [imageLoading, setImageLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Check if we're using an AI or custom background
  const hasBackgroundImage =
    (currentProfile.designMode === "ai" && currentProfile.aiBackground) ||
    currentProfile.customDesignUrl;

  const backgroundUrl =
    currentProfile.customDesignUrl || currentProfile.aiBackground;

  // Reset loading states when background URL changes
  useEffect(() => {
    if (hasBackgroundImage && backgroundUrl) {
      setImageLoading(true);
      setImageLoaded(false);
      setImageError(false);

      console.log(
        "🔄 [LOADING] Starting to load background image:",
        backgroundUrl
      );

      const img = new Image();

      img.onload = () => {
        console.log("✅ [LOADED] Background image loaded successfully");
        setImageLoading(false);
        setImageLoaded(true);
        setImageError(false);
      };

      img.onerror = () => {
        console.error("❌ [ERROR] Failed to load background image");
        setImageLoading(false);
        setImageLoaded(false);
        setImageError(true);
      };

      // Start loading
      img.src = backgroundUrl;

      // Timeout after 30 seconds
      const timeout = setTimeout(() => {
        if (!imageLoaded) {
          console.warn("⏱️ [TIMEOUT] Image loading timeout");
          setImageLoading(false);
          setImageError(true);
        }
      }, 30000);

      return () => clearTimeout(timeout);
    } else {
      setImageLoading(false);
      setImageLoaded(false);
      setImageError(false);
    }
  }, [backgroundUrl, hasBackgroundImage, imageLoaded]);

  return (
    <div
      className={`
        relative w-full max-w-[360px] h-[200px] sm:h-[220px]
        rounded-[24px] shadow-2xl overflow-hidden transition-all
        ${templateStyles.className || ""}
      `}
      style={{
        ...templateStyles.style,
        ...(templateStyles.borderColor && {
          borderColor: templateStyles.borderColor,
        }),
      }}
    >
      {/* Loading Overlay */}
      {imageLoading && hasBackgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center">
            <Loader2 className="w-8 h-8 text-white animate-spin mx-auto mb-2" />
            <p className="text-white text-xs font-medium">
              Loading AI Background...
            </p>
            <p className="text-white/70 text-[10px] mt-1">
              This may take a few moments
            </p>
          </div>
        </div>
      )}

      {/* Error Overlay */}
      {imageError && hasBackgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 to-orange-900/90 backdrop-blur-sm flex items-center justify-center z-20">
          <div className="text-center px-4">
            <p className="text-white text-xs font-medium">
              Failed to load background
            </p>
            <p className="text-white/70 text-[10px] mt-1">
              Using fallback design
            </p>
          </div>
        </div>
      )}

      {templateStyles.overlay && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${templateStyles.overlay}`}
        />
      )}

      {/* CONTENT */}
      <div
        className={`relative z-10 h-full flex flex-col justify-between px-5 py-4 ${templateStyles.textColor}`}
      >
        <div className="flex items-center gap-3">
          {currentProfile.image ? (
            <img
              src={currentProfile.image}
              alt="Profile"
              className={`w-12 h-12 object-cover border-2 ${
                isPersonal ? "rounded-full" : "rounded-lg"
              } shadow-lg`}
            />
          ) : (
            <div
              className={`w-12 h-12 flex items-center justify-center border-2 ${
                isPersonal ? "rounded-full" : "rounded-lg"
              } bg-white/20 backdrop-blur-sm`}
            >
              {isPersonal ? <User /> : <Building />}
            </div>
          )}

          <div>
            <p className="text-sm font-semibold opacity-90">Dot LinkMe</p>
            <p className="text-xs opacity-70">Smart NFC Digital Identity</p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold tracking-tight">
            {currentProfile.name || "Your Name"}
          </h3>
          <p className="text-xs opacity-80">
            {currentProfile.title || "Your role or title"}
          </p>
          <p className="text-[11px] opacity-75 line-clamp-2">
            {currentProfile.bio ||
              "This is a preview of your smart identity card."}
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px]">
          <span className="px-2 py-1 rounded-full bg-black/20 text-white">
            {isPersonal ? "Personal" : "Business"}
          </span>
          <span className="px-2 py-1 rounded-full bg-black/20 text-white">
            NFC • QR
          </span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Main Component — with Mobile Preview Modal
============================================================ */
export default function LiveCardPreview({
  profileType,
  currentProfile,
  selectedTemplate,
}) {
  const profileUrl = generateProfileUrl(currentProfile.name);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  return (
    <>
      {/* DESKTOP MODE - STICKY */}
      <div
        className="
          hidden lg:block
          w-full space-y-6 lg:sticky lg:top-28 lg:flex-[1] min-w-0
        "
        data-aos="fade-left"
      >
        <DesktopPreview
          profileType={profileType}
          currentProfile={currentProfile}
          selectedTemplate={selectedTemplate}
        />
      </div>

      {/* MOBILE PREVIEW BUTTON */}
      <button
        onClick={() => setShowMobilePreview(true)}
        className="
    lg:hidden fixed bottom-6 left-6 z-50
    group transition-all duration-300 hover:scale-110
  "
      >
        <div className="relative">
          <div className="absolute inset-0 bg-[#0066ff]/20 rounded-full blur-xl animate-blob"></div>

          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-[#0066ff] to-[#0052cc] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center">
            <span className="text-white text-[10px] sm:text-xs font-semibold group-hover:-translate-y-1 transition-transform duration-300">
              Preview
            </span>
          </div>
        </div>
      </button>

      {/* MOBILE PREVIEW MODAL */}
      {showMobilePreview && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 lg:hidden"
          onClick={() => setShowMobilePreview(false)}
        >
          <div
            className="bg-white rounded-2xl
            shadow-2xl  w-full max-w-sm p-4 relative "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Actual Card Preview */}
            <CardPreview
              profileType={profileType}
              currentProfile={currentProfile}
              selectedTemplate={selectedTemplate}
            />
          </div>
        </div>
      )}
    </>
  );
}

/* ============================================================
   Desktop Layout component
============================================================ */
function DesktopPreview({ profileType, currentProfile, selectedTemplate }) {
  return (
    <>
      <div className="card-glass p-6 border-2 border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-brand-primary uppercase tracking-wide flex items-center gap-1">
              <Zap className="w-4 h-4" /> Live Preview
            </p>
            <p className="text-sm text-gray-500">Real-time card preview</p>
          </div>

          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-brand-primary/10 to-purple-500/10 text-[11px] font-medium border border-brand-primary/20">
            {profileType === "personal" ? (
              <User className="w-4 h-4" />
            ) : (
              <Briefcase className="w-4 h-4" />
            )}
          </span>
        </div>

        <div className="mb-4 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 shadow-sm">
            <span className="text-xs font-medium text-gray-700">
              Template:{" "}
              <span className="font-bold capitalize">{selectedTemplate}</span>
            </span>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <CardPreview
            profileType={profileType}
            currentProfile={currentProfile}
            selectedTemplate={selectedTemplate}
          />
        </div>

        {/* Show AI background notice */}
        {currentProfile.designMode === "ai" && currentProfile.aiBackground && (
          <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs font-semibold text-purple-900">
                  AI-Generated Background
                </p>
                {currentProfile.aiPrompt && (
                  <p className="text-xs text-gray-600">
                    "{currentProfile.aiPrompt}"
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Show custom design notice */}
        {currentProfile.customDesignUrl && (
          <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-xs font-semibold text-blue-900">
                  Custom Design Active
                </p>
                <p className="text-xs text-gray-600">
                  Your uploaded design is being used
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card-glass p-4 text-xs text-gray-600 border-2 border-gray-100">
        <ul className="space-y-1 pl-1">
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Changes update in real-time on the preview</span>
          </li>
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Upload custom design for unique card appearance</span>
          </li>
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Use AI design for auto-generated backgrounds</span>
          </li>
          <li className="flex items-start gap-1">
            <span>•</span>
            <span>Experiment with templates to find your perfect match</span>
          </li>
        </ul>
      </div>
    </>
  );
}
