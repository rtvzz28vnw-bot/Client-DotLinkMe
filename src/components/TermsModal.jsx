import React, { useState, useEffect } from "react";
import {
  X,
  Shield,
  FileText,
  AlertTriangle,
  Loader2,
  CheckCircle2,
  ScrollText,
  Scale,
} from "lucide-react";
import axios from "axios";

export default function TermsModal({ isOpen, onClose }) {
  const [termsData, setTermsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (isOpen) {
      fetchTermsAndConditions();
    }
  }, [isOpen]);

  const fetchTermsAndConditions = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_URL}/api/terms`);

      if (response.data.success) {
        setTermsData(response.data.data);
      } else {
        setError("Failed to load terms and conditions");
      }
    } catch (err) {
      console.error("Error fetching terms:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load terms and conditions. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col my-8 border border-gray-200">
        {/* Professional Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                <Scale className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {termsData?.title || "Terms & Conditions"}
                </h2>
                <p className="text-sm text-gray-600">
                  Legal agreement governing your use of our services
                </p>
                {termsData?.version && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Version {termsData.version}
                    </span>
                    {termsData?.effectiveDate && (
                      <span className="text-xs text-gray-500">
                        Effective:{" "}
                        {new Date(termsData.effectiveDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-gray-50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              </div>
              <p className="text-gray-700 font-medium">
                Loading Terms & Conditions...
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Please wait while we retrieve the document
              </p>
            </div>
          ) : error ? (
            <div className="bg-white border border-red-200 rounded-lg p-8 max-w-2xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Unable to Load Document
                  </h3>
                  <p className="text-gray-600 mb-4">{error}</p>
                  <button
                    onClick={fetchTermsAndConditions}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Retry Loading
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Important Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-5">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-amber-900 mb-1">
                      Legal Agreement
                    </h3>
                    <p className="text-sm text-amber-800 leading-relaxed">
                      By accessing or using our services, you acknowledge that
                      you have read, understood, and agree to be legally bound
                      by these Terms & Conditions. If you do not agree, please
                      do not use our services.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div
                  className="prose prose-sm max-w-none p-8 leading-relaxed text-gray-700"
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: termsData?.content
                      ?.replace(/\n\n/g, "</p><p class='mt-4'>")
                      .replace(/\n/g, "<br />")
                      .replace(/^/, "<p>")
                      .replace(/$/, "</p>")
                      .replace(
                        /#{1,6}\s*(.*?)(<br \/>|<\/p>)/g,
                        (match, title) => {
                          return `<h3 class="text-lg font-bold text-gray-900 mt-8 mb-3">${title}</h3>`;
                        }
                      ),
                  }}
                />
              </div>

              {/* Document Metadata */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="w-5 h-5 text-gray-600 mt-0.5" />
                  <h3 className="font-semibold text-gray-900">
                    Document Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {termsData?.effectiveDate && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Effective Date:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {new Date(termsData.effectiveDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                  {termsData?.updatedAt && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Last Updated:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {new Date(termsData.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}
                  {termsData?.lastModifiedBy && (
                    <div>
                      <span className="font-medium text-gray-700">
                        Modified By:
                      </span>
                      <p className="text-gray-600 mt-0.5">
                        {termsData.lastModifiedBy}
                      </p>
                    </div>
                  )}
                  <div>
                    <span className="font-medium text-gray-700">
                      Document Status:
                    </span>
                    <p className="text-gray-600 mt-0.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Currently Active
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500 leading-relaxed">
                    These terms may be updated periodically. We will notify you
                    of any material changes. Continued use of our services after
                    updates constitutes acceptance of the revised terms.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Professional Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-8 py-4 flex items-center justify-between z-10">
          <p className="text-xs text-gray-500">
            Please read this document carefully before proceeding
          </p>
          <button
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {loading ? "Loading..." : "I Acknowledge"}
          </button>
        </div>
      </div>
    </div>
  );
}
