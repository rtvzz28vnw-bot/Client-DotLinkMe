import React from "react";
import {
  Link as LinkIcon,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Edit2,
} from "lucide-react";
import { getPlatformIcon } from "../../../utils/platformIcons";

export default function SocialLinksTab({
  socialLinks,
  onAddLink,
  onEditLink, // Add this new prop
  onToggleVisibility,
  onDelete,
}) {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6"
      style={{
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-brand-dark">Social Links</h2>
            <p className="text-sm text-gray-600">
              Manage your social media connections
            </p>
          </div>
        </div>
        <button
          onClick={onAddLink}
          className="btn-primary-clean px-6 py-3 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Link
        </button>
      </div>

      {socialLinks.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <LinkIcon className="w-10 h-10 text-gray-400" />
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            No social links yet
          </p>
          <p className="text-gray-600 mb-6">
            Add your social media profiles to connect with your audience
          </p>
          <button
            onClick={onAddLink}
            className="btn-primary-clean px-6 py-3 inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Your First Link
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {socialLinks.map((link) => (
            <div
              key={link.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl hover:border-brand-primary/50 hover:shadow-md transition-all group"
            >
              {/* Platform-specific icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-blue-600 flex items-center justify-center flex-shrink-0">
                <span className="[&>svg]:w-6 [&>svg]:h-6 [&>svg]:text-white">
                  {getPlatformIcon(link.platform)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-brand-dark capitalize">
                  {link.platform}
                </p>
                <p className="text-sm text-gray-600 truncate">{link.url}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Edit Button */}
                <button
                  onClick={() => onEditLink(link)}
                  className="p-2.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                  title="Edit"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Visibility Toggle */}
                <button
                  onClick={() => onToggleVisibility(link.id)}
                  className={`p-2.5 rounded-lg transition-all ${
                    link.isVisible
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  title={link.isVisible ? "Hide" : "Show"}
                >
                  {link.isVisible ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(link.id)}
                  className="p-2.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
