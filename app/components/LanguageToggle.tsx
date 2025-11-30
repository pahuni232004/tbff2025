"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { Languages } from "lucide-react";
import { motion } from "framer-motion";
import TranslationError from "./TranslationError";

export default function LanguageToggle() {
    const { language, toggleLanguage, isTranslating, showError, setShowError } = useLanguage();

    return (
        <motion.button
            onClick={toggleLanguage}
            disabled={isTranslating}
            className={`
                relative flex items-center justify-center gap-2 
                font-texta bg-[#FFCE21] text-[#091529] 
                font-bold text-lg md:text-sm uppercase 
                px-6 py-3 md:px-4 md:py-2 rounded-md 
                hover:opacity-90 transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                group overflow-hidden w-48 md:w-auto md:min-w-[100px]
                text-center
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${language === "en" ? "Hindi" : "English"}`}
        >
            {/* Background animation */}
            <motion.div
                className="absolute inset-0 bg-[#091529]"
                initial={{ x: "-100%" }}
                animate={{ x: language === "hi" ? "0%" : "-100%" }}
                transition={{ duration: 0.3 }}
            />
            
            {/* Content */}
            <div className="relative z-10 flex items-center gap-2">
                <Languages 
                    size={20}
                    className={`w-5 h-5 md:w-4 md:h-4 transition-transform duration-300 ${
                        isTranslating ? "animate-spin" : ""
                    } ${language === "hi" ? "text-[#FFCE21]" : "text-[#091529]"}`}
                />
                <span className={`whitespace-nowrap transition-colors duration-300 ${
                    language === "hi" ? "text-[#FFCE21]" : "text-[#091529]"
                }`}>
                    {language === "en" ? "हिंदी" : "English"}
                </span>
            </div>
        </motion.button>
    );
}

// Export error component separately for use in context
export { TranslationError };

