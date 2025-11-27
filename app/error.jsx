"use client";
import { useEffect } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiRefreshCw, FiHome } from "react-icons/fi";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          {/* Error Icon */}
          <div className="mb-8">
            <FiAlertTriangle className="text-8xl text-orange-500 mx-auto animate-bounce" />
          </div>

          {/* Error Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Something Went Wrong</h1>
          <p className="text-lg text-gray-600 mb-8">
            We encountered an unexpected error. Don&apos;t worry, we&apos;re on it!
          </p>

          {/* Error Details (for development) */}
          {process.env.NODE_ENV === "development" && error && (
            <div className="bg-red-50 rounded-lg p-4 mb-8 text-left">
              <p className="text-sm text-red-800 font-mono break-all">
                {error.message || "Unknown error"}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transform hover:scale-105 transition"
            >
              <FiRefreshCw className="text-xl" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition"
            >
              <FiHome className="text-xl" />
              <span>Go Home</span>
            </Link>
          </div>

          {/* Help Text */}
          <p className="text-gray-500 text-sm mt-8">
            If the problem persists, please <Link href="/#contact" className="text-blue-600 hover:text-blue-700 underline">contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
