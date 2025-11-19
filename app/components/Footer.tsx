"use client";

import Image from "next/image";
import SafeLink from "./SafeLink";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaPhone, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const year = new Date().getFullYear();

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus("error");
            setMessage("Please enter a valid email address");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage(data.message || "Successfully subscribed!");
                setEmail("");
                // Reset message after 5 seconds
                setTimeout(() => {
                    setStatus("idle");
                    setMessage("");
                }, 5000);
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to subscribe. Please try again.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Network error. Please try again later.");
        }
    };

    return (
        <footer className="bg-[#500E1E] text-white pt-16 pb-8 px-6 md:px-12 relative z-40 -mt-[50px] md:-mt-[150px]">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-white/20 pb-10">
                {/* Left - Logo & Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Image
                            src="/assets/black vertical logo_page-0001 - Edited.png"
                            alt="Bhopal Film Festival"
                            width={110}
                            height={120}
                            className="object-contain"
                        />
                        <h2 className="font-bebas text-xl font-medium">Bhopal Film Festival</h2>
                    </div>
                    <p className="font-texta text-sm text-white/90 leading-relaxed">
                        Celebrating films and voices from the heart of Madhya Pradesh. Showcasing stories that inspire and connect audiences.
                    </p>
                    <p className="font-texta text-sm text-white/80">
                        Discover screenings, events, and passes — be part of the festival.
                    </p>

                </div>

                {/* Middle - Links */}
                <div className="flex flex-col space-y-3">
                    <h3 className="font-bebas text-lg font-medium mb-3">Quick Links</h3>
                    <SafeLink href="/submit-film" className="font-texta text-white/90 hover:text-white transition">
                        Submit Film
                    </SafeLink>
                    <SafeLink href="/about" className="font-texta text-white/90 hover:text-white transition">
                        About
                    </SafeLink>
                    <SafeLink href="/passes" className="font-texta text-white/90 hover:text-white transition">
                        Get Passes
                    </SafeLink>
                    <a href="mailto:info@bhopalfilmfestival.com" className="font-texta text-white/90 hover:text-white transition">
                        Email
                    </a>
                </div>

                {/* Right - Subscribe */}
                <div className="space-y-4">
                    <h3 className="font-bebas text-lg font-medium">Stay Updated</h3>
                    <form onSubmit={handleSubscribe} className="space-y-2">
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                required
                                disabled={status === "loading"}
                                className="font-texta w-full px-3 py-2 rounded-t-md sm:rounded-l-md sm:rounded-t-none bg-gray-200 text-black placeholder-gray-600 outline-none text-sm disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="font-texta bg-white text-black px-4 py-2 rounded-b-md sm:rounded-r-md sm:rounded-b-none font-medium hover:bg-gray-100 transition text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === "loading" ? "Subscribing..." : "Subscribe"}
                            </button>
                        </div>
                        {message && (
                            <p className={`font-texta text-xs ${status === "success" ? "text-green-300" : "text-red-300"
                                }`}>
                                {message}
                            </p>
                        )}
                    </form>
                    <div className="flex gap-4 mt-4">
                        <a href="#" aria-label="Facebook" className="hover:text-gray-300 transition">
                            <FaFacebookF size={20} />
                        </a>
                        <a href="https://www.instagram.com/thebhopalfilmfestival?igsh=cWF0MTh6b2VhaGR1" aria-label="Instagram" className="hover:text-gray-300 transition">
                            <FaInstagram size={20} />
                        </a>
                        <a href="#" aria-label="Twitter" className="hover:text-gray-300 transition">
                            <FaTwitter size={20} />
                        </a>
                        <a href="#" aria-label="YouTube" className="hover:text-gray-300 transition">
                            <FaYoutube size={20} />
                        </a>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/90">
                        <FaPhone className="text-white/80" size={18} />
                        <span className="font-texta">+91 90399 15389</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/90">
                        <FaPhone className="text-white/80" size={18} />
                        <span className="font-texta">+91 88783 76408</span>
                    </div>


                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-6 text-sm text-white/80">
                <p className="font-texta">© {year} All rights reserved — Bhopal Film Festival</p>
                <p className="font-texta">
                    Built by ETWOT and assisted by{" "}
                    <SafeLink
                        href="https://www.devmanish.com/"
                        target="_blank"
                        className=" hover:text-white"
                    >
                        Manish
                    </SafeLink>
                </p>
            </div>
        </footer>
    );
}
