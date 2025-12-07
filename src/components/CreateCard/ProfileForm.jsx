import React, { useEffect } from "react";
import BasicInfoSection from "./BasicInfoSection";
import TemplateSelector from "./TemplateSelector";
import DesignModeSection from "./DesignModeSection";
import SocialLinksSection from "./SocialLinksSection";
import CardDesignUploader from "./CardDesignUploader"; // ✅ Import added
import {
  User,
  Briefcase,
  Zap,
  Rocket,
  Plus,
  Loader2,
  UploadCloud,
} from "lucide-react";

export default function ProfileForm({
  profileType,
  currentProfile,
  updateProfile,
  socialLinks,
  onSocialLinksChange,
  selectedTemplate,
  onTemplateChange,
  templates,
  onSubmit,
  onSwitchProfile,
  loading,
}) {
  const API_URL = import.meta.env.VITE_API_URL; // ✅ Add this line

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const wasDataRestored = localStorage.getItem(
          "createCardFormDataRestored"
        );

        if (wasDataRestored === "true") {
          localStorage.removeItem("createCardFormDataRestored");
          return;
        }

        const response = await fetch(`${API_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (!currentProfile.name) {
          const fullName = [data.firstName, data.secondName, data.lastName]
            .filter(Boolean)
            .join(" ");

          updateProfile({
            name: fullName || "",
            firstName: data.firstName || "",
            secondName: data.secondName || "",
            lastName: data.lastName || "",
          });
        }

        if (data.email && !socialLinks.email) {
          onSocialLinksChange("email", data.email);
        }
        if (data.phoneNumber && !socialLinks.phone) {
          onSocialLinksChange("phone", data.phoneNumber);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🆕 ADD THESE TWO FUNCTIONS HERE (AFTER useEffect, BEFORE handleSubmit)
  const handleCustomDesignUpload = async (file) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to upload custom designs");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", file);

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

      updateProfile({
        customDesignUrl: data.url,
        customDesignFile: file,
      });
    } catch (error) {
      console.error("Error uploading custom design:", error);
      throw error;
    }
  };

  const handleCustomDesignRemove = () => {
    updateProfile({
      customDesignUrl: null,
      customDesignFile: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payloadSocialLinks = Object.entries(socialLinks)
      .filter(
        ([key, value]) =>
          value && key !== "phone_code" && key !== "whatsapp_code"
      )
      .map(([key, value]) => {
        if (key === "phone") {
          const code = socialLinks["phone_code"] || "+962";
          return {
            platform: "phone",
            url: `${code} ${value}`,
          };
        }
        if (key === "whatsapp") {
          const code = socialLinks["whatsapp_code"] || "+962";
          return {
            platform: "whatsapp",
            url: `${code} ${value}`,
          };
        }
        return {
          platform: key,
          url: value,
        };
      });

    onSubmit({ ...currentProfile, socialLinks: payloadSocialLinks });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card-glass p-6 md:p-8 space-y-6 lg:flex-[1.35] min-w-0"
      data-aos="fade-right"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="text-xl md:text-2xl font-bold text-brand-dark flex items-center gap-2">
          <span>
            {profileType === "personal" ? (
              <User className="w-5 h-5" />
            ) : (
              <Briefcase className="w-5 h-5" />
            )}
          </span>
          {profileType === "personal"
            ? "Personal Information"
            : "Business Information"}
        </h2>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-primary/10 to-purple-500/10 text-brand-primary border border-brand-primary/20 flex items-center gap-1">
          <Zap className="w-3 h-3" /> Live preview →
        </span>
      </div>

      {/* Basic Info */}
      <BasicInfoSection
        profileType={profileType}
        currentProfile={currentProfile}
        updateProfile={updateProfile}
      />

      {/* 🆕 ADD THIS SECTION: Custom Card Design Uploader */}
      <div className="rounded-xl p-4 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
        <CardDesignUploader
          currentDesignUrl={currentProfile.customDesignUrl}
          onUpload={handleCustomDesignUpload}
          onRemove={handleCustomDesignRemove}
        />
      </div>

      {/* Rest of your existing code... */}
      <div className="rounded-xl p-3 bg-white shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-gray-700 mb-1">
          Card Design Settings
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <TemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplate}
              onTemplateChange={onTemplateChange}
            />
          </div>

          <div className="lg:col-span-5 h-full">
            <DesignModeSection
              currentProfile={currentProfile}
              updateProfile={updateProfile}
            />
          </div>
        </div>

        {/* Background upload section */}
        <div className="pt-2 border-t border-gray-200/60">
          <input
            type="file"
            accept="image/*"
            id="custom-bg"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                updateProfile({ customBackground: { file, preview: url } });
              }
            }}
          />
          <label
            htmlFor="custom-bg"
            className="flex items-center gap-3 p-2 rounded-lg border border-dashed border-gray-300 hover:border-brand-primary hover:bg-blue-50/30 cursor-pointer transition-colors group"
          >
            <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center group-hover:bg-white transition-colors">
              {currentProfile.customBackground?.preview ? (
                <img
                  src={currentProfile.customBackground.preview}
                  className="w-full h-full object-cover rounded-md"
                  alt="Background preview"
                />
              ) : (
                <UploadCloud className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="flex-1 text-left">
              <p className="text-xs font-semibold text-gray-700">
                Upload Background Image
              </p>
              <p className="text-[10px] text-gray-500">Recommended 1080×1920</p>
            </div>
          </label>
        </div>
      </div>

      <SocialLinksSection
        socialLinks={socialLinks}
        onSocialLinksChange={onSocialLinksChange}
      />

      {/* Submit buttons */}
      <div className="pt-4 space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary-clean w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-5 w-5" />
              Creating Your Card...
            </span>
          ) : (
            <span className="flex items-center gap-1 justify-center">
              <Rocket className="w-4 h-4" /> Generate my{" "}
              {profileType === "personal" ? "Personal" : "Business"} Card
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={onSwitchProfile}
          disabled={loading}
          className="btn-ghost-clean w-full py-3 text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 justify-center"
        >
          <Plus className="w-4 h-4" /> Also create{" "}
          {profileType === "personal" ? "Business" : "Personal"} profile
        </button>
      </div>
    </form>
  );
}
