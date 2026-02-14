"use client";

import Image from "next/image";

export default function SponsorBand() {
    return (
        <div className="w-full relative z-30">
            <Image
                src="/assets/sponsor band.png"
                alt="Our Sponsors"
                width={1920}
                height={200}
                className="w-full h-auto"
                quality={100}
                unoptimized
            />
        </div>
    );
}
