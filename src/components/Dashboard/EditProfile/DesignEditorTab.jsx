import React, { useState } from "react";
import {
  Palette,
  Sparkles,
  Upload,
  Wand2,
  Layout,
  X,
  Loader2,
  Image as ImageIcon,
  Check,
  Save,
} from "lucide-react";
import { generateAIImage } from "../../CreateCard/Aiutils";

export default function DesignEditorTab({
  profile,
  setProfile,
  saving,
  onSubmit,
}) {
  const [designMode, setDesignMode] = useState(
    profile.customDesignUrl ? "custom" : profile.designMode || "manual"
  );
  const [uploadingCustom, setUploadingCustom] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;

  const templates = [
    { id: "modern", name: "Modern", preview: "Solid color" },
    { id: "gradient", name: "Gradient", preview: "Smooth gradient" },
    { id: "glass", name: "Glass", preview: "Glassmorphism" },
    { id: "dark", name: "Dark", preview: "Dark theme" },
    { id: "neon", name: "Neon", preview: "Neon glow" },
    { id: "elegant", name: "Elegant", preview: "Elegant gradient" },
  ];

  const colorPresets = [
    "#0066FF", // Brand Blue
    "#8B5CF6", // Purple
    "#EC4899", // Pink
    "#10B981", // Green
    "#F59E0B", // Amber
    "#EF4444", // Red
    "#06B6D4", // Cyan
    "#6366F1", // Indigo
  ];

  // Handle AI Background Generation

  const handleGenerateAI = async () => {
    if (!profile.aiPrompt?.trim()) {
      alert("Please enter a prompt for AI generation");
      return;
    }

    setGeneratingAI(true);

    try {
      const imageUrl = await generateAIImage(profile.aiPrompt);

      setProfile({
        ...profile,
        designMode: "ai",
        aiBackground: imageUrl,
        customDesignUrl: null,
      });

      setDesignMode("ai");

      alert("AI background generated!");
    } catch (error) {
      alert("Failed to generate AI background");
    } finally {
      setGeneratingAI(false);
    }
  };

  // Handle Custom Design Upload
  const handleCustomDesignUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, JPEG)");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setUploadingCustom(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("avatar", file);

      // Upload to Cloudinary
      const response = await fetch(`${API_URL}/api/profiles/upload-temp`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();

      // Update local state (not saved until user clicks Save Changes)
      setProfile({
        ...profile,
        customDesignUrl: data.url,
        customDesignFile: file,
        designMode: "custom",
        aiBackground: null,
      });

      setDesignMode("custom");

      alert("Custom design uploaded! Click 'Save Changes' to apply.");
    } catch (error) {
      console.error("Error uploading custom design:", error);
      alert("Failed to upload custom design. Please try again.");
    } finally {
      setUploadingCustom(false);
    }
  };

  // Handle Remove Custom Design
  const handleRemoveCustomDesign = () => {
    setProfile({
      ...profile,
      customDesignUrl: null,
      customDesignFile: null,
      designMode: "manual",
    });
    setDesignMode("manual");
  };

  // ✅ FIXED: Handle Template Change - NOW clears custom design
  const handleTemplateChange = (templateId) => {
    setProfile({
      ...profile,
      template: templateId,
      designMode: "manual",
      customDesignUrl: null, // Clear custom design when selecting template
      aiBackground: null,
    });
    setDesignMode("manual");
  };

  // ✅ FIXED: Handle Color Change - NOW clears custom design
  const handleColorChange = (color) => {
    setProfile({
      ...profile,
      color: color,
      designMode: "manual",
      customDesignUrl: null, // Clear custom design when selecting color
      aiBackground: null,
    });
    setDesignMode("manual");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
      style={{
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <Palette className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-brand-dark">Card Design</h2>
          <p className="text-sm text-gray-600">
            Customize your card appearance
          </p>
        </div>
      </div>

      {/* Design Mode Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-gray-700">
          Design Mode
        </label>
        <div className="grid grid-cols-3 gap-3">
          {/* Manual Mode */}
          <button
            type="button"
            onClick={() => {
              setDesignMode("manual");
              // ✅ FIXED: Don't clear custom design, just switch to manual view
            }}
            className={`p-4 rounded-xl border-2 transition-all ${
              designMode === "manual"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Layout className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-semibold">Manual</p>
            <p className="text-xs text-gray-500">Templates & Colors</p>
          </button>

          {/* AI Mode */}
          <button
            type="button"
            onClick={() => setDesignMode("ai")}
            className={`p-4 rounded-xl border-2 transition-all ${
              designMode === "ai"
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Wand2 className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-sm font-semibold">AI Design</p>
            <p className="text-xs text-gray-500">Generate with AI</p>
          </button>

          {/* Custom Upload Mode */}
          <button
            type="button"
            onClick={() => setDesignMode("custom")}
            className={`p-4 rounded-xl border-2 transition-all ${
              designMode === "custom"
                ? "border-green-500 bg-green-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Upload className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-semibold">Custom</p>
            <p className="text-xs text-gray-500">Upload Image</p>
          </button>
        </div>
      </div>

      {/* Manual Mode - Templates & Colors */}
      {designMode === "manual" && (
        <div className="space-y-6">
          {/* Template Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Card Template
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleTemplateChange(template.id)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    profile.template === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <p className="text-sm font-semibold">{template.name}</p>
                    <p className="text-xs text-gray-500">{template.preview}</p>
                  </div>
                  {profile.template === template.id && (
                    <div className="mt-2 flex justify-center">
                      <Check className="w-4 h-4 text-blue-600" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Color Picker */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700">
              Brand Color
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {colorPresets.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => handleColorChange(color)}
                  className={`w-12 h-12 rounded-xl border-2 transition-all ${
                    profile.color === color
                      ? "border-gray-900 scale-110"
                      : "border-gray-200 hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                >
                  {profile.color === color && (
                    <Check className="w-5 h-5 text-white mx-auto" />
                  )}
                </button>
              ))}
            </div>

            {/* Custom Color Input */}
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={profile.color}
                onChange={(e) => handleColorChange(e.target.value)}
                className="h-14 w-14 rounded-xl border-2 border-gray-300 cursor-pointer"
              />
              <div>
                <p className="text-xs text-gray-500">
                  This color will be used for your profile theme
                </p>
                <p className="text-sm font-mono text-gray-700 mt-1">
                  {profile.color}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Mode - Prompt Input */}
      {designMode === "ai" && (
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            AI Prompt
          </label>
          <p className="text-xs text-gray-500">
            Describe the background you want AI to generate
          </p>
          <textarea
            value={profile.aiPrompt || ""}
            onChange={(e) =>
              setProfile({ ...profile, aiPrompt: e.target.value })
            }
            placeholder="e.g., A futuristic cityscape at sunset with neon lights..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/40 focus:border-brand-primary transition-all resize-none"
            rows={4}
          />
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={generatingAI || !profile.aiPrompt?.trim()}
            className="btn-ghost-clean w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {generatingAI ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Generate AI Background
              </span>
            )}
          </button>

          {profile.aiBackground && (
            <div className="mt-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
              <p className="text-xs font-semibold text-purple-900 mb-2">
                Preview (Click Save Changes to apply):
              </p>
              <img
                src={profile.aiBackground}
                alt="AI Generated"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
        </div>
      )}

      {/* Custom Upload Mode */}
      {designMode === "custom" && (
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Custom Card Design
          </label>
          <p className="text-xs text-gray-500">
            Upload your own design (PNG/JPG, max 5MB, recommended: 360×220px)
          </p>

          {profile.customDesignUrl ? (
            /* Show Current Custom Design */
            <div className="relative group">
              <img
                src={profile.customDesignUrl}
                alt="Custom design"
                className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-3">
                <label
                  htmlFor="custom-design-upload"
                  className="px-4 py-2 bg-white text-brand-primary rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Change Design
                </label>
                <button
                  type="button"
                  onClick={handleRemoveCustomDesign}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ) : (
            /* Upload Button */
            <label
              htmlFor="custom-design-upload"
              className={`
                block w-full p-8 border-2 border-dashed border-gray-300 rounded-xl
                hover:border-brand-primary hover:bg-blue-50/30 transition-all cursor-pointer
                ${uploadingCustom ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <div className="flex flex-col items-center gap-3">
                {uploadingCustom ? (
                  <>
                    <Loader2 className="w-12 h-12 text-brand-primary animate-spin" />
                    <p className="text-sm font-medium text-gray-700">
                      Uploading...
                    </p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-brand-primary" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-700">
                        Click to upload custom design
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </>
                )}
              </div>
            </label>
          )}

          <input
            type="file"
            id="custom-design-upload"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleCustomDesignUpload}
            disabled={uploadingCustom}
            className="hidden"
          />
        </div>
      )}

      {/* Current Active Design Info */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm mb-4">
          <span className="text-gray-600">Active Design:</span>
          <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 font-semibold">
            {profile.customDesignUrl
              ? "Custom Upload"
              : profile.aiBackground
              ? "AI Generated"
              : `${profile.template || "modern"} Template`}
          </span>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          disabled={saving}
          className="btn-accent w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Saving Changes...
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  );
}
