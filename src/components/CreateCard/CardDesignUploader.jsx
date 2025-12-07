import React, { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";

export default function CardDesignUploader({
  currentDesignUrl,
  onUpload,
  onRemove,
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentDesignUrl || null);

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (PNG, JPG, JPEG)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Call parent upload handler
    setUploading(true);
    try {
      await onUpload(file);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload design. Please try again.");
      setPreview(currentDesignUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onRemove();
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          <ImageIcon className="w-4 h-4" />
          Custom Card Design (Optional)
        </label>
        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Remove
          </button>
        )}
      </div>

      <p className="text-xs text-gray-500">
        Upload your own card design. This will override templates and colors.
        Recommended size: 360×220px (PNG or JPG)
      </p>

      {/* Upload Area */}
      <div className="relative">
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileSelect}
          disabled={uploading}
          className="hidden"
          id="custom-design-upload"
        />

        {preview ? (
          /* Preview */
          <div className="relative group">
            <img
              src={preview}
              alt="Custom card design"
              className="w-full h-48 object-cover rounded-xl border-2 border-gray-200"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
              <label
                htmlFor="custom-design-upload"
                className="px-4 py-2 bg-white text-brand-primary rounded-lg font-medium cursor-pointer hover:bg-gray-100 transition-colors"
              >
                Change Design
              </label>
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
        ) : (
          /* Upload Button */
          <label
            htmlFor="custom-design-upload"
            className={`
              block w-full p-8 border-2 border-dashed border-gray-300 rounded-xl
              hover:border-brand-primary hover:bg-blue-50/30 transition-all cursor-pointer
              ${uploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            <div className="flex flex-col items-center gap-3">
              {uploading ? (
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
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <p className="text-xs text-blue-900">
          <strong>💡 Tip:</strong> Your custom design will be printed on your
          physical NFC card. Make sure it's high quality and looks good!
        </p>
      </div>
    </div>
  );
}
