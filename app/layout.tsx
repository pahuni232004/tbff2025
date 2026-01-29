import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { textaAlt } from "./fonts";
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata: Metadata = {
    title: {
        default: "Bhopal Film Festival",
        template: "%s | Bhopal Film Festival",
    },
    description:
        "Bhopal Film Festival celebrates independent cinema with screenings, events, and emerging filmmakers.",
    keywords: [
        "Bhopal Film Festival",
        "Film Festival India",
        "Bhopal Events",
        "Independent Cinema",
    ],
    metadataBase: new URL("https://thebhopalfilmfestival.com"),
    openGraph: {
        title: "Bhopal Film Festival",
        description:
            "Explore screenings, events, film submissions, and festival passes.",
        url: "https://thebhopalfilmfestival.com",
        siteName: "Bhopal Film Festival",
        images: [
            {
                url: "/icon.svg",
                width: 1200,
                height: 630,
            },
        ],
        locale: "en_IN",
        type: "website",
    },
    robots: {
        index: true,
        follow: true,
    },
};

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={textaAlt.variable}>
            <head>
                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-KJSW4276');`,
                    }}
                />
                {/* Microsoft Clarity */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(c,l,a,r,i,t,y){
                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "v8x9t2pjyd");`,
                    }}
                />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased relative`}
            >
                <Script
                    id="google-translate-init"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.googleTranslateElementInit = function() {
                                if (typeof google !== 'undefined' && google.translate) {
                                    var element = document.getElementById('google_translate_element');
                                    if (!element) {
                                        element = document.createElement('div');
                                        element.id = 'google_translate_element';
                                        element.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:1px;height:1px;overflow:hidden;';
                                        document.body.appendChild(element);
                                    }
                                    try {
                                        new google.translate.TranslateElement({
                                            pageLanguage: 'en',
                                            includedLanguages: 'en,hi',
                                            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                                            autoDisplay: false,
                                        }, 'google_translate_element');
                                        console.log('Google Translate widget initialized');
                                    } catch(e) {
                                        console.error('Error initializing Google Translate:', e);
                                    }
                                }
                            };
                        `,
                    }}
                />
                <Script
                    id="google-translate-script"
                    src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                    strategy="lazyOnload"
                />
                <LanguageProvider>
                    {/* NAVBAR */}
                    <Navbar />

                    {/* PAGE CONTENT */}
                    <div className="relative z-[1]">{children}</div>

                    {/* FOOTER */}
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
