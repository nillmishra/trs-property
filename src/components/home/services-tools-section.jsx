"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

// Service data with all 6 items
const servicesData = [
    {
        id: 1,
        title: "Best Loan Offers",
        description: "Access competitive home loan options tailored to your property and financial profile.",
        image: "/assets/images/service/service-one.avif",
        href: "/services/loan-offers"
    },
    {
        id: 2,
        title: "Professional Legal Services",
        description: "Ensure every transaction is legally sound, compliant, and risk-free.",
        image: "/assets/images/service/service-two.avif",
        href: "/services/legal-services"
    },
    {
        id: 3,
        title: "EMI & Eligibility Calculator",
        description: "Instantly estimate EMIs and plan your purchase with clarity and confidence.",
        image: "/assets/images/service/service-three.avif",
        href: "/services/emi-calculator"
    },
    {
        id: 4,
        title: "Property Valuation",
        description: "Get accurate, data-backed property valuations to make informed decisions.",
        image: "/assets/images/service/service-one.avif",
        href: "/services/property-valuation"
    },
    {
        id: 5,
        title: "Property Management",
        description: "End-to-end management to protect your asset and maximize returns.",
        image: "/assets/images/service/service-two.avif",
        href: "/services/property-management"
    },
    {
        id: 6,
        title: "Research & Advisory",
        description: "Insight-driven guidance to help you invest, buy, or sell smarter.",
        image: "/assets/images/service/service-three.avif",
        href: "/services/research-advisory"
    },
]

const ServicesToolsSection = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    }

    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-[#0a0a0a] via-[#0d0a14] to-[#0a0a0a] overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#1a1030]/20 to-transparent"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#6B46C1]/5 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#492974]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide">
                        CURATED TOOLS & SERVICES
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#6B46C1] to-[#C6A256] mx-auto mt-4"></div>
                </motion.div>

                {/* Services Grid - 3 columns, 2 rows */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
                >
                    {servicesData.map((service) => (
                        <motion.div
                            key={service.id}
                            variants={itemVariants}
                            className="group"
                        >
                            <Link href={service.href}>
                                <div className="flex items-stretch bg-[#12121a] rounded-2xl overflow-hidden border border-white/5 hover:border-[#6B46C1]/30 transition-all duration-300 h-full cursor-pointer min-h-[140px]">
                                    {/* Image Section - Left */}
                                    <div className="relative w-40 md:w-48 flex-shrink-0 overflow-hidden">
                                        <Image
                                            src={service.image}
                                            alt={service.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#12121a]/50"></div>
                                    </div>
                                    
                                    {/* Content Section - Right */}
                                    <div className="flex-1 p-5 flex flex-col justify-center">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-white font-semibold text-lg md:text-xl leading-tight mb-2 group-hover:text-[#C6A256] transition-colors duration-300">
                                                    {service.title}
                                                </h3>
                                                <p className="text-white/50 text-sm md:text-base leading-relaxed line-clamp-2">
                                                    {service.description}
                                                </p>
                                            </div>
                                            
                                            {/* Arrow Button */}
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="w-10 h-10 rounded-lg bg-[#1a1a24] border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#6B46C1] group-hover:border-[#6B46C1] transition-all duration-300"
                                            >
                                                <ChevronRight className="w-5 h-5 text-white" />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default ServicesToolsSection