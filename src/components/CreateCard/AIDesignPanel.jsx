import React, { useState } from "react";
import { generateAIImage } from "./Aiutils";
import { Sparkles, AlertTriangle, Palette, Star, Loader2 } from "lucide-react";

export default function AIDesignPanel({
  aiPrompt,
  onPromptChange,
  onGenerate,
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!aiPrompt.trim()) {
      setError("Please enter a description for your card design");
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const startTime = Date.now();
      const imageUrl = await generateAIImage(aiPrompt);

      await new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(imageUrl);
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = imageUrl;
      });

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(1500 - elapsedTime, 0);

      if (remainingTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, remainingTime));
      }

      onGenerate(imageUrl);
    } catch (err) {
      setError("Failed to generate or load AI design. Please try again.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Input Section */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-semibold text-gray-700 ml-1">
            Describe your vision
          </label>
        </div>

        <textarea
          value={aiPrompt}
          onChange={(e) => {
            onPromptChange(e.target.value);
            setError(null);
          }}
          placeholder="e.g. Dark elegant theme with gold accents..."
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 bg-gray-50/50 resize-none transition-all placeholder:text-gray-400"
          disabled={isGenerating}
        />
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-100 rounded-lg p-3 animate-shake">
          <p className="text-xs text-red-600 flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 shrink-0" /> {error}
          </p>
        </div>
      )}

      {/* Main Action Button */}
      <button
        type="button"
        onClick={handleGenerate}
        disabled={isGenerating || !aiPrompt.trim()}
        className={`
          w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 relative overflow-hidden
          ${
            isGenerating || !aiPrompt.trim()
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
          }
        `}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin h-4 w-4" />
            <span>Creating Magic...</span>
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Generate Design
          </span>
        )}
      </button>
    </div>
  );
}
