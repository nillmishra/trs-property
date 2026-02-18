"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

const BuilderLounge = () => {
  const benefits = [
    {
      title: "Builder Profile",
      desc: "We give builders a credible digital headquarters. A dedicated builder profile showcases the company's legacy, vision, certifications, and complete project portfolio—past, ongoing, and upcoming. It becomes a trust asset, not just a listing, positioning the builder as a brand.",
    },
    {
      title: "Lead Generation",
      desc: "Our platform acts as a growth engine, not a directory. Builders gain access to targeted marketing campaigns and qualified buyer leads driven by data, intent, and reach. From discovery to conversion, we reduce sales friction and ensure every inquiry has real purchase potential.",
    },
    {
      title: "Project Listing",
      desc: "Each project is presented with depth, clarity, and intent. Rich listings highlight floor plans, amenities, pricing, timelines, and compliance details—designed to inform, persuade, and convert. The result: faster visibility, stronger buyer confidence, and accelerated deal velocity.",
    },
    {
      title: "Agent Network",
      desc: "Builders instantly tap into a verified, performance-driven agent ecosystem. This extended sales force amplifies reach across geographies without increasing fixed costs—turning agents into distribution partners and projects into scalable opportunities.",
    },
  ];

  const builderLogos = [
    { name: "Godrej Properties", src: "/assets/images/builderLogo/GODREJ PROPERTIES.png" },
    { name: "Raymond Realty", src: "/assets/images/builderLogo/RAYMOND REALITY.png" },
    { name: "DAMAC", src: "/assets/images/builderLogo/DAMAC.png" },
    { name: "Oberoi Realty", src: "/assets/images/builderLogo/OBERAI REALITY.jpeg" },
    { name: "Kalpataru", src: "/assets/images/builderLogo/KALPATARU.png" },
    { name: "Skye Earth", src: "/assets/images/builderLogo/SKYE EARTH.png" },
    { name: "Sobha Realty", src: "/assets/images/builderLogo/SOBHA REALTY.png" },
    { name: "Bhutani Infra", src: "/assets/images/builderLogo/BHUTANI.png" },
    { name: "Bhartiya City", src: "/assets/images/builderLogo/BHARTIYA CITY.png" },
  ];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a] text-white">

        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden">

          {/* Full-width background image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/assets/images/detail/banner.jpg"
              alt="builder background"
              fill
              unoptimized
              className="object-top object-center"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Content — text box overlays from left, vertically centred */}
          <div className="relative z-10 container mx-auto px-4 py-32 flex items-center min-h-[520px]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#111]/90 border border-[#C6A256]/30 p-10 flex flex-col justify-center w-full max-w-lg backdrop-blur-sm"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Built for Builders
                <br />
                <span className="text-[#C6A256]">Who Think Long-Term.</span>
              </h1>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                TRS Property Mall is not just a marketplace — it is a
                strategic ecosystem designed to empower builders at every
                stage of growth. From brand presence to sales enablement,
                we bring technology and marketing under one roof.
              </p>

              <button className="bg-[#C6A256] text-black px-6 py-3 text-sm font-semibold hover:bg-[#d4b45f] transition w-fit">
                Learn More
              </button>
            </motion.div>
          </div>
        </section>

        {/* ================= BENEFITS SECTION ================= */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Benefits For Builders
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-6 bg-transparent hover:bg-[#111] transition text-center"
                >
                  <h3 className="text-lg font-semibold mb-4 text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= TRUSTED BUILDERS SECTION ================= */}
        <section className="py-8">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-6 items-center">

            {/* LEFT TEXT */}
            <div>
              <h2 className="text-4xl font-bold leading-snug">
                Trusted by
                <br />
                leading builders
                <br />
                &amp; developers.
              </h2>
            </div>

            {/* RIGHT LOGO GRID — all boxes same fixed size, image fills/zooms to show brand clearly */}
            <div className="grid grid-cols-3 gap-4">
              {builderLogos.map((logo, i) => (
                <div
                  key={i}
                  className="bg-white flex items-center justify-center overflow-hidden"
                  style={{ width: "100%", aspectRatio: "2/1" }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 33vw, 15vw"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-12 bg-gradient-to-r from-[#C6A256]/10 to-transparent text-center">
          <h2 className="text-2xl font-bold mb-4">
            Ready to scale your projects with TRS?
          </h2>

          <button className="bg-[#C6A256] text-black px-6 py-3 text-sm font-semibold hover:bg-[#d4b45f] transition inline-flex items-center gap-2">
            Get Started <ArrowRight size={16} />
          </button>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default BuilderLounge;