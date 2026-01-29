"use client";

import { useEffect } from "react";

export default function PassesPage() {
  useEffect(() => {
    // Redirect to KonfHub ticketing page
    window.location.href = "https://konfhub.com/the-bhopal-film-festival-2026";
  }, []);

  return (
    <main className="min-h-screen bg-[#FFCE21] flex items-center justify-center">
      <div className="text-center">
        <p className="font-texta text-[#091529] text-xl">
          Redirecting to ticket booking...
        </p>
      </div>
    </main>
  );
}
