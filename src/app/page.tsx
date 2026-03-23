"use client";

import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ProductReveal from "@/components/ProductReveal";
import StickyTextReveal from "@/components/StickyTextReveal";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <ProductReveal />
        <StickyTextReveal />
        <CallToAction />
      </main>
    </div>
  );
}