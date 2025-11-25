"use client";
import Link from "next/link";
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">ShopHub</h3>
            <p className="text-sm mb-4">
              Your trusted destination for quality products at unbeatable prices. Shop with confidence!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition">
                <FiFacebook className="text-xl" />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FiTwitter className="text-xl" />
              </a>
              <a href="#" className="hover:text-blue-400 transition">
                <FiInstagram className="text-xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#about" className="hover:text-blue-400 transition text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#products" className="hover:text-blue-400 transition text-sm">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-400 transition text-sm">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-blue-400 transition text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-400 transition text-sm">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition text-sm">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition text-sm">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <FiMapPin className="flex-shrink-0" />
                <span>123 Shop Street, City, Country</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <FiPhone className="flex-shrink-0" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <FiMail className="flex-shrink-0" />
                <span>support@shophub.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {currentYear} ShopHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
