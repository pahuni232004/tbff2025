"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";

interface TranslationErrorProps {
    onClose: () => void;
}

export default function TranslationError({ onClose }: TranslationErrorProps) {
    const translateUrl = `https://translate.google.com/translate?sl=en&tl=hi&u=${encodeURIComponent(
        typeof window !== "undefined" ? window.location.href : ""
    )}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 bg-[#091529] text-white p-6 rounded-lg shadow-2xl z-[10000] max-w-md border-2 border-[#FFCE21]"
        >
            <div className="flex items-start gap-4">
                <div className="flex-1">
                    <h3 className="font-texta font-bold text-lg mb-2 text-[#FFCE21]">
                        Translation Unavailable
                    </h3>
                    <p className="text-sm mb-4 text-white/90">
                        Google Translate is being blocked by your browser or an extension (like an ad blocker).
                    </p>
                    <div className="space-y-2 mb-4">
                        <p className="text-sm font-semibold text-[#FFCE21]">To fix this:</p>
                        <ol className="text-sm text-white/80 list-decimal list-inside space-y-1 ml-2">
                            <li>Temporarily disable your ad blocker for this site</li>
                            <li>Or disable privacy extensions</li>
                            <li>Refresh the page and try again</li>
                        </ol>
                    </div>
                    <a
                        href={translateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-texta bg-[#FFCE21] text-[#091529] font-bold text-sm uppercase px-4 py-2 rounded-md hover:opacity-90 transition mb-2"
                    >
                        Translate via Google Translate
                    </a>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/70 hover:text-white transition"
                    aria-label="Close"
                >
                    <X size={20} />
                </button>
            </div>
        </motion.div>
    );
}

