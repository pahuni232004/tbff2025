"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Popups() {
  const [showPopup1, setShowPopup1] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);

  useEffect(() => {
    // Check if popups have been closed before (using sessionStorage so they show on each new session)
    const popup1Closed = sessionStorage.getItem("popup1-closed");
    const popup2Closed = sessionStorage.getItem("popup2-closed");

    // Show popups if they haven't been closed in this session
    // Show popup1 first, then popup2 after popup1 is closed
    if (!popup1Closed) {
      setShowPopup1(true);
    } else if (!popup2Closed) {
      // Only show popup2 if popup1 has been closed
      setShowPopup2(true);
    }
  }, []);

  const closePopup1 = () => {
    setShowPopup1(false);
    sessionStorage.setItem("popup1-closed", "true");
    // Show popup2 after closing popup1 if it hasn't been closed
    const popup2Closed = sessionStorage.getItem("popup2-closed");
    if (!popup2Closed) {
      setShowPopup2(true);
    }
  };

  const closePopup2 = () => {
    setShowPopup2(false);
    sessionStorage.setItem("popup2-closed", "true");
  };

  if (!showPopup1 && !showPopup2) {
    return null;
  }

  return (
    <>
      {/* Popup 1 - Deadline extension */}
      {showPopup1 && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
          <div className="fixed top-[80px] md:top-[108px] left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="relative max-w-[70vw] md:w-[600px] md:max-w-[600px] max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-108px)] mx-4">
            <button
              onClick={closePopup1}
              className="absolute -top-4 -right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src="/pop ups/Deadline extension website-01.png"
              alt="Deadline Extension"
              width={600}
              height={450}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
            </div>
          </div>
        </div>
      )}

      {/* Popup 2 - Pan India */}
      {showPopup2 && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm">
          <div className="fixed top-[80px] md:top-[108px] left-0 right-0 bottom-0 flex items-center justify-center">
            <div className="relative max-w-[70vw] md:w-[450px] md:max-w-[450px] max-h-[calc(100vh-80px)] md:max-h-[calc(100vh-108px)] mx-4">
            <button
              onClick={closePopup2}
              className="absolute -top-4 -right-4 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-800"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <Image
              src="/pop ups/Pan India.jpg"
              alt="Pan India"
              width={450}
              height={338}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

