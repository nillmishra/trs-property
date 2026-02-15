"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignupForm from "./signup-form";
import SendOtpForm from "./send-otp-form";
import VerifyOtpForm from "./verify-otp-form";

export default function AuthModal({ isOpen, onClose }) {
  const [internalOpen, setInternalOpen] = useState(isOpen);
  const [activeTab, setActiveTab] = useState("sendOtp");
  const [sendOtpInfo, setSendOtpInfo] = useState({ phone: "", role: "" });

  // 🔥 YE NAYA HAI (BAS YE)
  useEffect(() => {
    const openModal = () => {
      setActiveTab("sendOtp");
      setInternalOpen(true);
    };
    window.addEventListener("open-auth-modal", openModal);
    return () => window.removeEventListener("open-auth-modal", openModal);
  }, []);

  useEffect(() => {
    setInternalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setInternalOpen(false);
    onClose();
  };

  if (!internalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          className="fixed inset-0 bg-black/70"
          onClick={handleClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-gradient-to-b from-[#1a1333] to-[#0d0a1a] rounded-lg shadow-xl w-full max-w-md z-10 mx-4"
        >
          {activeTab === "sendOtp" && (
            <SendOtpForm
              onClose={handleClose}
              setSendOtpInfo={setSendOtpInfo}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "verifyOtp" && (
            <VerifyOtpForm
              onClose={handleClose}
              sendOtpInfo={sendOtpInfo}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === "signup" && (
            <SignupForm
              setActiveTab={setActiveTab}
              onClose={handleClose}
              sendOtpInfo={sendOtpInfo}
              setSendOtpInfo={setSendOtpInfo}
            />
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
