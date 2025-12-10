// AI utilities using Hugging Face (Free & Reliable)

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Generate AI Background
export const generateAIImage = async (prompt) => {
  try {
    console.log("🎨 Generating AI background with prompt:", prompt);

    const response = await fetch(`${API_URL}/api/ai/generate-background`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Server error response:", error);
      throw new Error(
        error.details || error.error || "Failed to generate image"
      );
    }

    const data = await response.json();

    if (!data.imageUrl) {
      throw new Error("No image URL received from server");
    }

    console.log("✅ Generated background received (base64)");

    return data.imageUrl;
  } catch (error) {
    console.error("❌ AI Image generation error:", error);
    throw new Error(
      error.message || "Failed to generate background. Please try again."
    );
  }
};

// Generate AI Logo
export const generateAILogo = async (prompt) => {
  try {
    console.log("🎨 Generating AI logo with prompt:", prompt);

    const response = await fetch(`${API_URL}/api/ai/generate-logo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    console.log("📡 Response status:", response.status);

    if (!response.ok) {
      const error = await response.json();
      console.error("❌ Server error response:", error);
      throw new Error(
        error.details || error.error || "Failed to generate logo"
      );
    }

    const data = await response.json();

    if (!data.imageUrl) {
      throw new Error("No image URL received from server");
    }

    console.log("✅ Generated logo received (base64)");

    return data.imageUrl;
  } catch (error) {
    console.error("❌ AI Logo generation error:", error);
    throw new Error(
      error.message || "Failed to generate logo. Please try again."
    );
  }
};
