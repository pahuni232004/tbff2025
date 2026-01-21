"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Popups() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a short delay when page loads
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative max-w-[90vw] max-h-[90vh] animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-[#091529] text-white rounded-full flex items-center justify-center text-2xl font-bold hover:bg-[#0a1a35] transition-colors shadow-lg"
          aria-label="Close popup"
        >
          ×
        </button>
        
        {/* Popup Image */}
        <Image
          src="/assets/venue 2-01.png"
          alt="Venue - Minto Hall"
          width={800}
          height={600}
          className="rounded-lg shadow-2xl max-w-full max-h-[85vh] w-auto h-auto object-contain"
          priority
        />
      </div>
    </div>
  );
}
