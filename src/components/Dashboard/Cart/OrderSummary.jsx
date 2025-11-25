import React from "react";

export default function OrderSummary({ totalAmount = 15.0 }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">NFC Card</span>
          <span className="font-medium">{totalAmount.toFixed(2)} JOD</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-semibold">Total</span>
          <span className="font-bold text-brand-primary text-lg">
            {totalAmount.toFixed(2)} JOD
          </span>
        </div>
      </div>
    </div>
  );
}
