// src/app/page.tsx
"use client";

import Footer from "./components/Footer";
import MeetCrew from "./components/Meetcrew";
import Navbar from "./components/Navbar";
import DogScroller from "./components/ScrollScene";
import Awards from "./components/Awards";


export default function Page() {
  return (
    <main className="overflow-x-hidden">
      <DogScroller/>
      <MeetCrew/>
      <Awards/>
    </main>
  );
}
