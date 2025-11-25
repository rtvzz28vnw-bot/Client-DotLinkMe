import React from "react";
import {
  X,
  Copy,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Share2,
  Instagram,
} from "lucide-react";

export default function ShareModal({ isOpen, onClose, onShare }) {
  if (!isOpen) return null;

  const shareOptions = [
    {
      id: "copy",
      name: "Copy Link",
      icon: <Copy className="w-6 h-6" />,
      color: "from-gray-500 to-gray-600",
      hoverColor: "hover:from-gray-600 hover:to-gray-700",
    },
    {
      id: "whatsapp",
      name: "WhatsApp",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "from-green-500 to-green-600",
      hoverColor: "hover:from-green-600 hover:to-green-700",
    },
    {
      id: "twitter",
      name: "Twitter",
      icon: <Twitter className="w-6 h-6" />,
      color: "from-blue-400 to-blue-500",
      hoverColor: "hover:from-blue-500 hover:to-blue-600",
    },
    {
      id: "facebook",
      name: "Facebook",
      icon: <Facebook className="w-6 h-6" />,
      color: "from-blue-600 to-blue-700",
      hoverColor: "hover:from-blue-700 hover:to-blue-800",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
      color: "from-blue-700 to-blue-800",
      hoverColor: "hover:from-blue-800 hover:to-blue-900",
    },
    {
      id: "instagram",
      name: "Instagram",
      icon: <Instagram className="w-6 h-6" />,
      color: "from-pink-500 to-purple-600",
      hoverColor: "hover:from-pink-600 hover:to-purple-700",
    },
  ];

  // Check if native share is available
  const hasNativeShare = navigator.share !== undefined;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-3xl shadow-2xl border border-white/10 max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Share Profile</h3>
                <p className="text-sm text-gray-400">Choose how to share</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="p-6">
          {/* Native Share (if available) */}
          {hasNativeShare && (
            <button
              onClick={() => onShare("native")}
              className="w-full mb-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-2xl transition-all flex items-center justify-center gap-3 text-white font-semibold shadow-lg"
            >
              <Share2 className="w-5 h-5" />
              Share via...
            </button>
          )}

          {/* Share Options Grid */}
          <div className="grid grid-cols-2 gap-3">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onShare(option.id)}
                className={`group p-4 bg-gradient-to-br ${option.color} ${option.hoverColor} rounded-2xl transition-all flex flex-col items-center gap-2 text-white shadow-lg hover:shadow-xl hover:scale-105`}
              >
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-all">
                  {option.icon}
                </div>
                <span className="text-sm font-medium">{option.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
