"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiShoppingCart, FiStar, FiPackage, FiTag, FiCalendar, FiTrendingUp } from "react-icons/fi";
import axios from "@/lib/axios";

export default function ProductDetailsPage({ params }) {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await axios.get(`${API_URL}/products/${params.id}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Product not found");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <FiPackage className="mx-auto text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FiArrowLeft />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Back Button */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition group"
          >
            <FiArrowLeft className="text-xl group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div className="p-8">
              {/* Main Image */}
              <div className="relative h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden mb-4 flex items-center justify-center">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiShoppingCart className="text-8xl text-gray-400" />
                )}
                {product.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === index
                          ? "border-blue-600 scale-105"
                          : "border-gray-200 hover:border-blue-400"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Details */}
            <div className="p-8">
              {/* Category Badge */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                  <FiTag className="mr-1" />
                  {product.category}
                </span>
                {product.stock > 0 ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`text-lg ${
                        i < Math.floor(product.rating || 0)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-3 text-gray-600">
                  {product.rating ? product.rating.toFixed(1) : "0.0"} ({product.numReviews || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-5xl font-bold text-blue-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-500 text-lg line-through">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                    Save 20%
                  </span>
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-6 border-t border-b border-gray-200 py-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Meta Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <FiPackage className="text-lg" />
                    <span className="text-sm font-medium">Stock Quantity</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {product.stock} units
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <FiTrendingUp className="text-lg" />
                    <span className="text-sm font-medium">Priority</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {product.featured ? "High" : "Standard"}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <FiCalendar className="text-lg" />
                    <span className="text-sm font-medium">Added Date</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(product.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-gray-600 mb-1">
                    <FiCalendar className="text-lg" />
                    <span className="text-sm font-medium">Last Updated</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900">
                    {new Date(product.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  disabled={product.stock === 0}
                  className="flex-1 inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                >
                  <FiShoppingCart className="text-xl" />
                  <span>{product.stock > 0 ? "Add to Cart" : "Out of Stock"}</span>
                </button>
                
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition"
                >
                  <FiArrowLeft />
                  <span>Browse More</span>
                </Link>
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">✓ What&apos;s Included:</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Free shipping on orders over $50</li>
                  <li>• 30-day money-back guarantee</li>
                  <li>• 1-year manufacturer warranty</li>
                  <li>• 24/7 customer support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section (Placeholder) */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
            Related products will appear here
          </div>
        </div>
      </div>
    </div>
  );
}
