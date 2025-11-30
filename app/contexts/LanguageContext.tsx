"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import TranslationError from "../components/TranslationError";

type Language = "en" | "hi";

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    isTranslating: boolean;
    showError: boolean;
    setShowError: (show: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>("en");
    const [isTranslating, setIsTranslating] = useState(false);
    const [showError, setShowError] = useState(false);
    
    // Prevent infinite reload loops by clearing sessionStorage flags after page load
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        // Check if we just reloaded due to translation
        const translationKey = 'translating_to_hindi';
        const englishKey = 'translating_to_english';
        
        // If flags are set, clear them after a short delay to prevent loops
        // This allows one reload per user action
        if (sessionStorage.getItem(translationKey)) {
            setTimeout(() => {
                sessionStorage.removeItem(translationKey);
            }, 2000);
        }
        
        if (sessionStorage.getItem(englishKey)) {
            setTimeout(() => {
                sessionStorage.removeItem(englishKey);
            }, 2000);
        }
    }, []);

    // Load language preference from localStorage on mount
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        // Don't clear cookies on mount - let Google Translate work
        // Only clear if switching back to English
        const savedLanguage = localStorage.getItem("language") as Language;
        if (savedLanguage === "hi" || savedLanguage === "en") {
            setLanguage(savedLanguage);
        }
    }, []);

    // Re-apply translation on page load if Hindi was selected
    useEffect(() => {
        if (typeof window === "undefined") return;
        
        const checkAndReapplyTranslation = () => {
            const savedLanguage = localStorage.getItem("language") as Language;
            if (savedLanguage === "hi") {
                // Wait a bit for Google Translate to load, then trigger translation
                setTimeout(() => {
                    const select = document.querySelector<HTMLSelectElement>(".goog-te-combo");
                    if (select && select.value !== "hi") {
                        select.value = "hi";
                        // Use proper event dispatching
                        const event = document.createEvent("HTMLEvents");
                        event.initEvent("change", true, true);
                        select.dispatchEvent(event);
                        select.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
                        
                        // Clear cookies after translation is triggered to prevent reload
                        setTimeout(() => {
                            const domain = window.location.hostname;
                            document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
                            document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                        }, 2000);
                    }
                }, 1500);
            }
        };

        // Check after a delay to ensure Google Translate script has loaded
        const timer = setTimeout(checkAndReapplyTranslation, 2000);
        return () => clearTimeout(timer);
    }, []);

    const restoreOriginalLanguage = useCallback(() => {
        if (typeof window === "undefined") return;
        
        // Use cookie-based method to restore English (same as translate, but for English)
        const translationKey = 'translating_to_english';
        const isTranslating = sessionStorage.getItem(translationKey);
        
        if (isTranslating) {
            return;
        }

        sessionStorage.setItem(translationKey, 'true');
        
        // Clear Google Translate cookie to restore English
        const domain = window.location.hostname;
        document.cookie = `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        document.cookie = `googtrans=; path=/; domain=${domain}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        
        // Clear the flag after a delay
        setTimeout(() => {
            sessionStorage.removeItem(translationKey);
        }, 2000);
        
        // Reload to apply change
        window.location.reload();
    }, []);

    const translatePageToHindi = useCallback(() => {
        setIsTranslating(true);
        
        if (typeof window === "undefined") {
            setIsTranslating(false);
            return;
        }

        // Use cookie-based method (this was working when it was reloading)
        // Use sessionStorage to prevent infinite reload loops
        const translationKey = 'translating_to_hindi';
        const isCurrentlyTranslating = sessionStorage.getItem(translationKey);
        
        if (isCurrentlyTranslating) {
            // Already triggered a reload, don't trigger again
            setIsTranslating(false);
            return;
        }

        // Mark that we're about to translate (prevents infinite loops)
        sessionStorage.setItem(translationKey, 'true');
        
        // Set Google Translate cookie to translate to Hindi
        const domain = window.location.hostname;
        document.cookie = `googtrans=/en/hi; path=/; max-age=3600`;
        document.cookie = `googtrans=/en/hi; path=/; domain=${domain}; max-age=3600`;
        
        // Clear the flag after reload completes (prevents loops)
        // The flag will be checked on page load and cleared
        setTimeout(() => {
            sessionStorage.removeItem(translationKey);
        }, 3000);
        
        // Reload the page to apply translation (this was working!)
        window.location.reload();
    }, []);


    // Apply translation when language changes
    useEffect(() => {
        // Wait for DOM to be ready
        if (typeof window === "undefined") return;

        const initTranslation = () => {
            if (language === "hi") {
                translatePageToHindi();
            } else {
                restoreOriginalLanguage();
            }
        };

        // Small delay to ensure DOM is ready
        const timer = setTimeout(initTranslation, 100);
        return () => clearTimeout(timer);
    }, [language, translatePageToHindi, restoreOriginalLanguage]);

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "hi" : "en";
        setLanguage(newLanguage);
        localStorage.setItem("language", newLanguage);
        
        // Only clear cookies when switching back to English to prevent reload
        if (typeof window !== "undefined" && newLanguage === "en") {
            document.cookie = "googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
            document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, isTranslating, showError, setShowError }}>
            {children}
            {/* Hidden Google Translate element */}
            <div id="google_translate_element" className="hidden" />
            {/* Error message */}
            {showError && <TranslationError onClose={() => setShowError(false)} />}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

