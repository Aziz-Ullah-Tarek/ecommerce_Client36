"use client";
import Link from "next/link";
import { FiHome, FiShoppingBag, FiSearch, FiAlertCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl shadow-xl p-12">
          {/* 404 Icon */}
          <div className="mb-8">
            <div className="relative inline-block">
              <FiAlertCircle className="text-8xl text-red-400 animate-pulse" />
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                404
              </div>
            </div>
          </div>

          {/* Error Message */}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Helpful Suggestions */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What can you do?</h3>
            <ul className="text-left text-gray-600 space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Check the URL for typos</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Go back to the previous page</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-blue-600">•</span>
                <span>Visit our homepage to start fresh</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition"
            >
              <FiHome className="text-xl" />
              <span>Go to Homepage</span>
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transform hover:scale-105 transition"
            >
              <FiShoppingBag className="text-xl" />
              <span>Browse Products</span>
            </Link>
          </div>

          {/* Search Suggestion */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
            <Link
              href="/products"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <FiSearch />
              <span>Search our products</span>
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-gray-500 text-sm mt-6">
          Error Code: 404 | Need help? <Link href="/#contact" className="text-blue-600 hover:text-blue-700 underline">Contact us</Link>
        </p>
      </div>
    </div>
  );
}
