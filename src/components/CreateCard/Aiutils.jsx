// AI utilities using Gemini backend API

const API_URL = import.meta.env.VITE_API_URL;

// Generate AI Background using Gemini backend
export const generateAIImage = async (prompt) => {
  try {
    console.log("🎨 Calling Gemini API with prompt:", prompt);

    const response = await fetch(`${API_URL}/api/ai/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate image");
    }

    const data = await response.json();
    console.log("✅ Successfully generated image from Gemini");

    return data.imageUrl; // This is the base64 data URL
  } catch (error) {
    console.error("❌ AI Image generation error:", error);
    throw new Error(
      error.message || "Failed to generate background. Please try again."
    );
  }
};

// Generate AI Logo using Gemini backend
export const generateAILogo = async (prompt) => {
  try {
    console.log("🎨 Calling Gemini API for logo with prompt:", prompt);

    // Enhance prompt for better logo results
    const logoPrompt = `Professional minimalist logo design, ${prompt}, vector art style, flat design, simple geometric shapes, clean lines, modern corporate identity, centered composition, solid white background, high contrast`;

    const response = await fetch(`${API_URL}/api/ai/generate-image`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: logoPrompt }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate logo");
    }

    const data = await response.json();
    console.log("✅ Successfully generated logo from Gemini");

    return data.imageUrl; // This is the base64 data URL
  } catch (error) {
    console.error("❌ AI Logo generation error:", error);
    throw new Error(
      error.message || "Failed to generate logo. Please try again."
    );
  }
};
