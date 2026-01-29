"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import SafeLink from "./SafeLink";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ensure component is mounted before using portal
    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header className="sticky top-0 z-50 bg-[#091529]">
            <div className="mx-auto px-6 lg:px-12">
                <div className="flex items-center justify-between py-4 md:py-[30px]">
                    <SafeLink href="/" aria-label="Home" className="flex items-center gap-2 md:gap-0">
                        <img
                            src="/assets/Logo.svg"
                            alt="Bhopal Film Festival Logo"
                            className="object-contain h-10 md:h-12 w-auto"
                            style={{ filter: 'brightness(0) saturate(100%) invert(73%) sepia(98%) saturate(1352%) hue-rotate(0deg) brightness(102%) contrast(101%)' }}
                        />
                    </SafeLink>

                    {/* DESKTOP MENU */}
                    <nav className="hidden md:block" aria-label="Main navigation">
                        <ul className="flex items-center gap-3">
                            <li>
                                <SafeLink
                                    href="/about"
                                    className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-sm uppercase px-4 py-2 rounded-md hover:opacity-90 transition"
                                >
                                    About
                                </SafeLink>
                            </li>
                            <li>
                                <SafeLink
                                    href="/terms"
                                    className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-sm uppercase px-4 py-2 rounded-md hover:opacity-90 transition"
                                >
                                    T&C
                                </SafeLink>
                            </li>
                            <li>
                                <SafeLink
                                    href="/submit-film"
                                    className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-sm uppercase px-4 py-2 rounded-md hover:opacity-90 transition"
                                >
                                    Submit Film
                                </SafeLink>
                            </li>
                            <li>
                                <a
                                    href="https://konfhub.com/the-bhopal-film-festival-2026"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-sm uppercase px-4 py-2 rounded-md hover:opacity-90 transition"
                                >
                                    GET PASSES
                                </a>
                            </li>
                            <li>
                                <LanguageToggle />
                            </li>
                        </ul>
                    </nav>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        className="md:hidden text-[#FFCE21]"
                        onClick={() => setOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={30} />
                    </button>
                </div>
            </div>

            {mounted && open && createPortal(
                <>
                    {/* Backdrop - covers entire viewport */}
                    <div
                        className="fixed inset-0 bg-black/50"
                        onClick={() => setOpen(false)}
                        style={{ zIndex: 10000 }}
                    />

                    {/* Menu Panel */}
                    <div
                        className="fixed right-0 top-0 h-full w-[80%] bg-[#091529] shadow-xl
            flex flex-col items-center justify-center gap-6 transition-transform duration-300"
                        style={{ zIndex: 10001 }}
                    >
                        <button
                            className="absolute top-4 right-4 text-[#FFCE21] z-10"
                            onClick={() => setOpen(false)}
                            aria-label="Close menu"
                        >
                            <X size={30} />
                        </button>

                        <SafeLink
                            href="/about"
                            className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-lg uppercase px-6 py-3 rounded-md hover:opacity-90 transition w-48 text-center relative z-10"
                            onClick={() => setOpen(false)}
                        >
                            ABOUT
                        </SafeLink>
                        <SafeLink
                            href="/terms"
                            className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-lg uppercase px-6 py-3 rounded-md hover:opacity-90 transition w-48 text-center relative z-10"
                            onClick={() => setOpen(false)}
                        >
                            T&C
                        </SafeLink>

                        <SafeLink
                            href="/submit-film"
                            className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-lg uppercase px-6 py-3 rounded-md hover:opacity-90 transition w-48 text-center relative z-10"
                            onClick={() => setOpen(false)}
                        >
                            SUBMIT FILM
                        </SafeLink>

                        <a
                            href="https://konfhub.com/the-bhopal-film-festival-2026"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-texta bg-[#FFCE21] text-[#091529] font-bold text-lg uppercase px-6 py-3 rounded-md hover:opacity-90 transition w-48 text-center relative z-10"
                            onClick={() => setOpen(false)}
                        >
                            GET PASSES
                        </a>

                        <div className="relative z-10 w-48">
                            <LanguageToggle />
                        </div>
                    </div>
                </>,
                document.body
            )}
        </header>
    );
}
