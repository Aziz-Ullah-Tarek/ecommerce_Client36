"use client";
import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <FiShoppingCart className="text-3xl text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
              Products
            </Link>
            <Link href="/#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons / User Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FiUser />
                  <span>{session.user?.name || session.user?.email}</span>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 border border-gray-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                      <p className="text-xs text-blue-600 mt-1 capitalize">
                        {session.user?.role || 'User'}
                      </p>
                    </div>
                    <Link
                      href="/add-product"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Add Product
                    </Link>
                    <Link
                      href="/manage-products"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Manage Products
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-blue-600 hover:text-blue-700 transition font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            {isMenuOpen ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-600 transition">
                Products
              </Link>
              <Link href="/#features" className="text-gray-700 hover:text-blue-600 transition">
                Features
              </Link>
              <Link href="/#about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
              <Link href="/#contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
              
              {session ? (
                <>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-900">{session.user?.name}</p>
                    <p className="text-xs text-gray-500">{session.user?.email}</p>
                  </div>
                  <Link
                    href="/add-product"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Add Product
                  </Link>
                  <Link
                    href="/manage-products"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Manage Products
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-red-600 hover:text-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-blue-600 hover:text-blue-700 transition font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 transition font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
