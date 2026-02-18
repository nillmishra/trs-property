"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Award,
  Play,
  ArrowRight,
  Sparkles,
  MessageCircle,
  Send,
} from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


const ConsultantLoungePage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    code: "IN +91",
    phone: "",
    email: "",
    company: "",
    experience: "",
    city: "",
    agreeTerms: false,
  });

  const [showVideoModal, setShowVideoModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const exclusiveDeals = [
    {
      id: 1,
      title: "Luxury Apartment Complex",
      location: "Vijay Nagar, Indore",
      price: "8,50,00,000",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      badge: "Premium",
    },
    {
      id: 2,
      title: "Executive Residency",
      location: "Palasia, Indore",
      price: "12,00,00,000",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
      badge: "Exclusive",
    },
    {
      id: 3,
      title: "Modern Villa Complex",
      location: "AB Road, Indore",
      price: "65,00,000",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      badge: "Featured",
    },
    {
      id: 4,
      title: "Elite Township",
      location: "Scheme 140, Indore",
      price: "75,00,000",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      badge: "Hot Deal",
    },
    {
      id: 5,
      title: "Commercial Hub",
      location: "MG Road, Indore",
      price: "45,00,000",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      badge: "Investment",
    },
    {
      id: 6,
      title: "Luxury Villas",
      location: "Ujjain Road, Indore",
      price: "50,00,000",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
      badge: "Premium",
    },
  ];

  const networkBenefits = [
    {
      title: "Exclusive Deals",
      description: "Access premium properties with special consultant rates",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Guaranteed Allotment",
      description: "Priority allotment in high-demand projects",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
    },
    {
      title: "Highest Brokerage",
      description: "Competitive commission structure for consultants",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "100% Transparency",
      description: "Complete transparency in all transactions",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "On-time Payments",
      description: "Guaranteed payment within 30 days",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Dedicated Support",
      description: "24/7 customer support for your needs",
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
        {/* ===== Hero + Two Column Section ===== */}
        <section className="relative pt-10 md:pt-16 pb-20 md:pb-28 overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1a1a1a]/40 rounded-full blur-3xl" />
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C6A256]/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#C6A256]/3 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Compact Hero */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center mb-12 md:mb-16"
            >
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-block px-4 py-2 rounded-full bg-[#C6A256]/10 text-[#C6A256] text-sm font-medium mb-5"
              >
                <Sparkles className="w-4 h-4 inline mr-2" />
                Exclusive Community
              </motion.span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Welcome to TRS{" "}
                <span className="text-[#C6A256]">Consultant Lounge</span>
              </h1>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Join an exclusive community of leading real estate consultants
                and brokers
              </p>
            </motion.div>

            {/* Two Column Layout */}
            <div className="grid lg:grid-cols-5 gap-8 xl:gap-12 items-start">
              {/* ===== LEFT COLUMN (3/5) ===== */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="lg:col-span-3 space-y-6"
              >
                {/* Text Content */}
                <div className="bg-gradient-to-r from-[#1a1a1a] to-[#141414] border border-[#C6A256]/10 rounded-2xl p-6 md:p-8">
                  <span className="inline-block px-3 py-1.5 rounded-full bg-[#C6A256]/10 text-[#C6A256] text-xs font-medium mb-4 uppercase tracking-wider">
                    Why Join TRS Lounge?
                  </span>

                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Network with leading consultants in real estate
                  </h2>

                  <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                    TRS Property Mall brings together trusted agents and
                    verified property listings to help you close deals with
                    speed, clarity, and confidence. Making every real estate
                    decision smooth and reliable.
                  </p>
                </div>

                {/* Video Section */}
                <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden group border border-[#C6A256]/10">
                  <Image
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80"
                    alt="Consultant"
                    width={700}
                    height={350}
                    className="w-full h-[250px] md:h-[320px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />

                  <button
                    onClick={() => setShowVideoModal(true)}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-[#C6A256] rounded-full flex items-center justify-center shadow-xl shadow-[#C6A256]/40"
                    >
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-white ml-1" />
                    </motion.div>
                  </button>

                  {/* Video label */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    <span className="text-white text-xs font-medium">
                      Watch Introduction
                    </span>
                  </div>
                </div>

                {/* Quick action */}
                <button
                  onClick={() => setShowVideoModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl text-sm font-medium hover:bg-white/10 hover:border-[#C6A256]/30 transition-all duration-300"
                >
                  <Play className="w-4 h-4 text-[#C6A256]" />
                  Talk to Expert
                </button>
              </motion.div>

              {/* ===== RIGHT COLUMN: Form (2/5) ===== */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-2 lg:sticky lg:top-24"
              >
                <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl p-6 md:p-7 border border-[#C6A256]/20">
                  <h3 className="text-xl font-bold text-white mb-1">
                    Agent Login / Sign up
                  </h3>
                  <p className="text-gray-500 text-sm mb-6">
                    Join our agent community today!
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#C6A256] focus:outline-none transition"
                          placeholder="First Name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#C6A256] focus:outline-none transition"
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="px-2.5 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-gray-400 text-xs flex items-center flex-shrink-0">
                          🇮🇳 +91
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="flex-1 px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#C6A256] focus:outline-none transition"
                          placeholder="Phone Number"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#C6A256] focus:outline-none transition"
                        placeholder="Email Address"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#C6A256] focus:outline-none transition"
                        placeholder="Company Name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                          Experience
                        </label>
                        <select
                          name="experience"
                          value={formData.experience}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-sm text-gray-400 focus:border-[#C6A256] focus:outline-none transition appearance-none"
                        >
                          <option value="">Select</option>
                          <option value="0-2">0-2 years</option>
                          <option value="2-5">2-5 years</option>
                          <option value="5-10">5-10 years</option>
                          <option value="10+">10+ years</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-white text-xs font-medium mb-1.5 uppercase tracking-wider">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full px-3 py-2.5 bg-[#0a0a0a] border border-gray-800 rounded-xl text-white text-sm placeholder-gray-600 focus:border-[#C6A256] focus:outline-none transition"
                          placeholder="Your City"
                        />
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 rounded border-gray-700 text-[#C6A256] focus:ring-[#C6A256] bg-[#0a0a0a]"
                        required
                      />
                      <label className="text-gray-500 text-xs leading-relaxed">
                        I agree to the{" "}
                        <Link
                          href="/terms"
                          className="text-[#C6A256] hover:underline"
                        >
                          terms & conditions
                        </Link>
                      </label>
                    </div>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-[#C6A256] to-[#D4B45F] text-[#0a0a0a] font-semibold py-3 rounded-xl text-sm hover:shadow-lg hover:shadow-[#C6A256]/30 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Request R-Lounge Access
                    </motion.button>
                  </form>

                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        {/* 🔥 STATS SECTION - COMPACT */}
       <section className="py-0">
  <div className="px-4">

    <div className="relative w-full overflow-hidden rounded-md">

      {/* BACKGROUND IMAGE */}
      <Image
        src="/assets/images/Group 1321314989.avif"
        alt="Stats Banner"
        width={1600}
        height={150}
        className="w-full max-h-[110px] object-contain"
        priority
      />

      {/* CENTER MICRO GIF */}
      <div className="absolute inset-0 flex items-center justify-center">

        <div
          onClick={() => setShowVideoModal(true)}
          className="relative w-24 h-16 ml-55 md:w-75 md:h-44 cursor-pointer rotate-90"
        >
          <Image
            src="/assets/images/client.gif"
            alt="Video Preview"
            fill
            unoptimized
            className="object-contain"
          />
        </div>

      </div>

    </div>

  </div>
</section>






        {/* Network Benefits Section */}
        <section className="relative py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-2 rounded-full bg-[#C6A256]/10 text-[#C6A256] text-sm font-medium mb-4">
                Benefits
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3">
                Network with leading developers
              </h2>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                R-Lounge is an exclusive community for the Agents & Brokers at
                TRS Property Mall
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {networkBenefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border border-[#C6A256]/10 rounded-2xl p-6 hover:border-[#C6A256]/40 transition-all duration-300 group"
                >
                  <div className="text-[#C6A256] mb-3 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1.5">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Exclusive Deals Section */}
        <section className="relative py-20 md:py-28 mt-[-70px] mb-[-30px]">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Top Exclusive Deals For TRS Consultants
                </h2>
                <Link
                  href="/property"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-full font-semibold text-sm hover:bg-gray-100 transition"
                >
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>

            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {exclusiveDeals.map((property, idx) => (
                  <CarouselItem key={property.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="group bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl overflow-hidden border border-[#C6A256]/20 hover:border-[#C6A256] transition-all duration-300"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={property.image}
                          alt={property.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        <span className="absolute top-3 right-3 px-3 py-1 bg-[#C6A256] text-gray-900 text-xs font-semibold rounded-full">
                          {property.badge}
                        </span>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">
                          {property.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-1">
                          📍 {property.location}
                        </p>
                        <p className="text-2xl font-bold text-[#C6A256] mb-4">
                          ₹ {property.price}
                        </p>
                        <button className="w-full bg-gradient-to-r from-[#C6A256] to-[#D4B45F] text-gray-900 font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-[#C6A256]/50 transition-all duration-300">
                          View Details
                        </button>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 border-[#C6A256]/20 text-white hover:bg-[#C6A256]/10" />
              <CarouselNext className="right-0 border-[#C6A256]/20 text-white hover:bg-[#C6A256]/10" />
            </Carousel>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-r from-[#C6A256]/5 via-transparent to-[#C6A256]/5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to join TRS Consultant Lounge?
              </h2>
              <p className="text-gray-400 text-sm md:text-base mb-8">
                Get exclusive access to premium properties, dedicated support,
                and join a network of 500+ successful consultants
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#C6A256] to-[#D4B45F] text-[#0a0a0a] font-semibold rounded-xl text-sm hover:shadow-xl hover:shadow-[#C6A256]/30 transition-all duration-300">
                  Request Access <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="https://wa.me/919425092651"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#25D366] text-white font-semibold rounded-xl text-sm hover:bg-[#1fa652] transition-all duration-300"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-3xl mx-4 bg-black rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition"
            >
              ✕
            </button>

            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="TRS Consultant Lounge"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default ConsultantLoungePage;



