import React from "react";
import {
  X,
  Copy,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Share2,
} from "lucide-react";

export default function ShareModal({ isOpen, onClose, onShare }) {
  if (!isOpen) return null;

  const shareOptions = [
    { id: "copy", name: "Copy Link", icon: <Copy className="w-5 h-5" /> },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
    },
    { id: "twitter", name: "Twitter", icon: <Twitter className="w-5 h-5" /> },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
    },
  ];

  const hasNativeShare = navigator.share !== undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Share Profile</h3>
          <button
            onClick={onClose}
            className="w-9 h-9 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {hasNativeShare && (
            <button
              onClick={() => onShare("native")}
              className="w-full mb-4 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-5 h-5" />
              Share via...
            </button>
          )}

          <div className="space-y-2">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onShare(option.id)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all text-left"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  {option.icon}
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
