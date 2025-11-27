"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { FiShoppingBag, FiTruck, FiShield, FiStar, FiAward } from "react-icons/fi";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const response = await axios.get(`${API_URL}/products`);
      // Get first 6 products or featured products
      const products = response.data.filter(p => p.featured).slice(0, 6);
      if (products.length === 0) {
        setFeaturedProducts(response.data.slice(0, 6));
      } else {
        setFeaturedProducts(products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      // Use default products if API fails
      setFeaturedProducts([]);
    }
  };

  return (
    <div>
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to ShopHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Discover Premium Products at Unbeatable Prices
          </p>
          <Link
            href="/#products"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-blue-50 transform hover:scale-105 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* 2. Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide exceptional service and quality products to make your shopping experience memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTruck className="text-4xl" />,
                title: "Free Shipping",
                description: "Free shipping on orders over $50. Fast and reliable delivery to your doorstep.",
              },
              {
                icon: <FiShield className="text-4xl" />,
                title: "Secure Payment",
                description: "Your payments are secure with our encrypted payment gateway.",
              },
              {
                icon: <FiAward className="text-4xl" />,
                title: "Quality Guarantee",
                description: "100% quality guarantee on all products. Shop with confidence.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition group"
              >
                <div className="text-blue-600 mb-4 group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Products Section */}
      <section id="products" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our collection of hand-picked products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <FiShoppingBag className="text-6xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">No featured products available yet.</p>
                <Link href="/add-product" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition">
                  Add Your First Product
                </Link>
              </div>
            ) : featuredProducts.map((product, index) => (
              <Link
                key={product._id || index}
                href={`/products/${product._id || '#'}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-2 transition group block"
              >
                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:from-blue-100 group-hover:to-purple-100 transition relative">
                  {product.images && product.images.length > 0 ? (
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiShoppingBag className="text-6xl text-gray-400 group-hover:text-blue-600 transition" />
                  )}
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-600 font-semibold">
                    {product.category}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <FiStar className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm text-gray-600 ml-1">{product.rating || 4.5}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price && !product.price.toString().startsWith('$') ? `$${product.price}` : product.price}
                    </span>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {featuredProducts.length > 0 && (
            <div className="text-center mt-12">
              <Link
                href="/products"
                className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Limited Time Offer!
          </h2>
          <p className="text-xl mb-8">
            Get 25% off on all electronics. Use code: <span className="font-mono font-bold">SHOP25</span>
          </p>
          <Link
            href="/#products"
            className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition"
          >
            Shop Electronics
          </Link>
        </div>
      </section>

      {/* 5. About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About ShopHub
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                ShopHub is your trusted destination for quality products at competitive prices. 
                We've been serving customers worldwide since 2020, providing exceptional service 
                and a curated selection of products.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our mission is to make online shopping easy, secure, and enjoyable. With thousands 
                of satisfied customers and a 99% satisfaction rate, we're committed to excellence.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">10K+</p>
                  <p className="text-sm text-gray-600">Products</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">50K+</p>
                  <p className="text-sm text-gray-600">Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">99%</p>
                  <p className="text-sm text-gray-600">Satisfaction</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl h-96 flex items-center justify-center">
              <FiShoppingBag className="text-9xl text-white opacity-30" />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Verified Buyer",
                comment: "Amazing quality and fast shipping! I've been shopping here for months and never disappointed.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                role: "Premium Member",
                comment: "Best prices online and excellent customer service. Highly recommended!",
                rating: 5,
              },
              {
                name: "Emily Davis",
                role: "Frequent Shopper",
                comment: "Love the product selection and user-friendly website. Shopping made easy!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition"
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.comment}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message!
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <form className="bg-white rounded-xl shadow-md p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transform hover:scale-105 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
