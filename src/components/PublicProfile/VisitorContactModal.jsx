import React, { useState } from "react";
import { X, Mail, Phone, Loader2, CheckCircle } from "lucide-react";
import Swal from "sweetalert2";

export default function VisitorContactModal({
  isOpen,
  onClose,
  profileSlug,
  source = "direct",
}) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const API_URL = import.meta.env.VITE_API_URL; // For Vite

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 7;
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number (minimum 7 digits)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/profiles/public/${profileSlug}/visitor-contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            phone: phone.trim(),
            source,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save contact information");
      }

      setSubmitted(true);
      setEmail("");
      setPhone("");
      setErrors({});

      // Auto close after 3 seconds
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error("Error saving contact:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to save your contact information",
        confirmButtonColor: "#3b82f6",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setPhone("");
    setErrors({});
    setSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-slate-800/95 via-slate-900/95 to-black/95 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="relative px-8 pt-8 pb-6 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border-b border-white/10">
          <button
            onClick={handleClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold text-white mb-2">
            {submitted ? "Thank You!" : "Get in Touch"}
          </h2>
          <p className="text-gray-300 text-sm">
            {submitted
              ? "Your contact information has been saved"
              : "Share your contact details to connect"}
          </p>
        </div>

        {/* Content */}
        <div className="p-8">
          {submitted ? (
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-400 animate-bounce" />
              </div>
              <p className="text-white text-lg font-semibold">Success!</p>
              <p className="text-gray-300 text-sm">
                Thank you for sharing your contact information. We'll get back
                to you soon.
              </p>
              <p className="text-gray-400 text-xs">
                This modal will close automatically...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-white font-medium mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    Email Address
                  </div>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: "" });
                    }
                  }}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/20 focus:ring-blue-500/50 focus:border-blue-500/50"
                  }`}
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-white font-medium mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone className="w-5 h-5 text-green-400" />
                    Phone Number
                  </div>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) {
                      setErrors({ ...errors, phone: "" });
                    }
                  }}
                  placeholder="+1 (555) 123-4567"
                  className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/20 focus:ring-green-500/50 focus:border-green-500/50"
                  }`}
                  disabled={loading}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Contact Info"
                )}
              </button>

              {/* Privacy Notice */}
              <p className="text-gray-400 text-xs text-center">
                Your information will be kept confidential and only used to
                contact you.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
