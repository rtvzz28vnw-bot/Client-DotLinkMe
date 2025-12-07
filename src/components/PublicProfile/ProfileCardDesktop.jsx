import React from "react";
import {
  Mail,
  Phone,
  MessageCircle,
  Globe,
  User,
  Building2,
  Share2,
} from "lucide-react";
import { getPlatformIcon } from "../../utils/platformIcons";

export default function ProfileCardDesktop({
  profile,
  phoneLink,
  emailLink,
  whatsappLink,
  handleCall,
  handleEmail,
  handleWhatsApp,
  handleDownloadVCard,
  handleSocialClick,
  setShowShareModal,
}) {
  const isPersonal = profile.profileType === "personal";

  // Get website link separately
  const websiteLink = profile.socialLinks?.find(
    (l) => l.platform === "website"
  );

  // Filter social links (exclude contact methods but INCLUDE website)
  const visibleLinks =
    profile.socialLinks?.filter(
      (link) =>
        link.isVisible &&
        link.platform !== "phone" &&
        link.platform !== "email" &&
        link.platform !== "whatsapp"
    ) || [];

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full">
        {/* Phone-like Card Container */}
        <div className="bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
          <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {/* Purple Header with More Curved Wave */}
            <div className="relative bg-purple-500 h-48">
              {/* More Curved Wave SVG */}
              <div className="absolute bottom-0 left-0 right-0">
                <svg
                  viewBox="0 0 1440 160"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,80 C320,140 480,140 720,80 C960,20 1120,20 1440,80 L1440,160 L0,160 Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Share Button */}
              <button
                onClick={() => setShowShareModal(true)}
                className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
              >
                <Share2 className="w-5 h-5 text-white" />
              </button>

              {/* Avatar - Overlapping */}
              <div className="absolute left-1/2 transform -translate-x-1/2 top-24">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                    {isPersonal ? (
                      <User className="w-16 h-16 text-purple-500" />
                    ) : (
                      <Building2 className="w-16 h-16 text-purple-500" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="pt-20 px-8 pb-8 text-center">
              {/* Name & Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                {profile.name}
              </h1>
              {profile.title && (
                <p className="text-sm text-gray-600 mb-1">{profile.title}</p>
              )}
              <p className="text-xs text-gray-500 mb-6">
                {profile.profileType === "personal"
                  ? "Personal Profile"
                  : profile.company || "Business Profile"}
              </p>

              {/* Bio */}
              {profile.bio && (
                <p className="text-sm text-gray-700 leading-relaxed mb-6 max-w-sm mx-auto">
                  {profile.bio}
                </p>
              )}

              {/* Contact Info List */}
              <div className="space-y-3 mb-6">
                {phoneLink && (
                  <button
                    onClick={() => handleCall(phoneLink.id, phoneLink.url)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {phoneLink.url}
                      </p>
                      <p className="text-xs text-gray-500">Work</p>
                    </div>
                  </button>
                )}

                {emailLink && (
                  <button
                    onClick={() => handleEmail(emailLink.id, emailLink.url)}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {emailLink.url}
                      </p>
                      <p className="text-xs text-gray-500">Work</p>
                    </div>
                  </button>
                )}

                {/* Website Link */}
                {websiteLink && websiteLink.isVisible && (
                  <button
                    onClick={() =>
                      handleSocialClick(websiteLink.id, websiteLink.url)
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {websiteLink.url}
                      </p>
                      <p className="text-xs text-gray-500">Work</p>
                    </div>
                  </button>
                )}

                {whatsappLink && (
                  <button
                    onClick={() =>
                      handleWhatsApp(whatsappLink.id, whatsappLink.url)
                    }
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-all text-left"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {whatsappLink.url}
                      </p>
                      <p className="text-xs text-gray-500">WhatsApp</p>
                    </div>
                  </button>
                )}
              </div>

              {/* Social Links */}
              {visibleLinks.length > 0 && (
                <div className="flex justify-center gap-4 mb-6">
                  {visibleLinks.slice(0, 4).map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleSocialClick(link.id, link.url)}
                      className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all group"
                    >
                      <span className="text-gray-700 group-hover:text-white">
                        {getPlatformIcon(link.platform)}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {/* Save Contact Button */}
              <button
                onClick={handleDownloadVCard}
                className="w-full py-4 bg-purple-500 text-white font-semibold rounded-xl hover:bg-purple-600 transition-all"
              >
                + Add to Contacts
              </button>

              {/* Powered By */}
              <p className="text-xs text-gray-400 mt-6">
                Powered by <span className="font-semibold">Dot LinkMe</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
