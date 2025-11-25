import React from "react";

export default function TemplateGuide({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Card Template Guide</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-3">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Standard NFC Card Dimensions:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Size: 85.6mm × 54mm (Credit card size)</li>
            <li>• Aspect Ratio: 16:10</li>
            <li>• Recommended Image: 800×450px minimum</li>
            <li>• Safe Zone: Keep important content 5mm from edges</li>
          </ul>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-900">
            <span className="font-semibold">💡 Tip:</span> Your logo/photo will
            be placed in the top-left corner. Leave space for it when designing
            your background!
          </p>
        </div>
        <img
          src="/card-template-guide.png"
          alt="Card template"
          className="w-full rounded-lg border"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <div
          style={{ display: "none" }}
          className="bg-gray-100 rounded-lg p-8 text-center"
        >
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-4">
            <p className="text-sm text-gray-600">Card Template Visualization</p>
            <div className="mt-2 text-xs text-gray-500">85.6mm × 54mm</div>
          </div>
        </div>
      </div>
    </div>
  );
}
