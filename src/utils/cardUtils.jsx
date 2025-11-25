// AI Generation utility
export const generateAIImage = async (prompt) => {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=450&nologo=true&enhance=true`;
  return imageUrl;
};

// Utility function to adjust color brightness
export function adjustColorBrightness(color, percent) {
  const num = parseInt(color.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

// Get template styles based on design mode
export function getTemplateStyles(selectedTemplate, currentProfile) {
  if (currentProfile.designMode === "ai" && currentProfile.aiBackground) {
    return {
      style: {
        backgroundImage: `url(${currentProfile.aiBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      className: "",
      textColor: "text-white",
      overlay: "from-black/40 to-black/20",
    };
  }

  if (currentProfile.designMode === "upload" && currentProfile.uploadedImage) {
    return {
      style: {
        backgroundImage: `url(${currentProfile.uploadedImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      },
      className: "",
      textColor: "text-white",
      overlay: "from-black/40 to-black/20",
    };
  }

  if (currentProfile.designMode === "manual") {
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
          className: "",
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
          overlay: null,
        };
      case "dark":
        return {
          style: {
            background: `linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, ${color}20 100%)`,
          },
          className: "",
          textColor: "text-white",
          overlay: "from-transparent via-black/20 to-transparent",
        };
      case "neon":
        return {
          style: {
            background: `linear-gradient(135deg, #000000 0%, #1a1a2e 100%)`,
            boxShadow: `0 0 30px ${color}40`,
          },
          className: `border-2`,
          textColor: "text-white",
          borderColor: color,
          overlay: null,
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
          className: "",
          textColor: "text-white",
          overlay: "from-white/5 to-transparent",
        };
      default:
        return {
          style: { backgroundColor: color },
          className: "",
          textColor: "text-white",
          overlay: "from-black/5 to-transparent",
        };
    }
  }

  return {
    style: {},
    className:
      "bg-gradient-to-br from-brand-primary/90 via-[#0B0F19] to-[#16203A]",
    textColor: "text-white",
    overlay: "from-black/10 to-transparent",
  };
}
