"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Brain, Shield, Battery } from "lucide-react";
import GlitchText from "./GlitchText";
import { useState, useEffect } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  progress: MotionValue<number>;
  range: [number, number, number];
  isActive: boolean;
}

function FeatureCard({ icon, title, description, progress, range, isActive }: FeatureCardProps) {
  const opacity = useTransform(progress, range, [0, 1, 0]);
  const scale = useTransform(progress, range, [0.8, 1, 0.8]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className="absolute inset-0 flex items-center justify-center px-8"
    >
      <div className="text-center max-w-4xl">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 flex items-center justify-center bg-gradient-to-br from-primary-600 to-cyan-600 rounded-full shadow-2xl"
        >
          {icon}
        </motion.div>
        
        <GlitchText
          text={title}
          isActive={isActive}
          className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight"
        />
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function StickyTextReveal() {
  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.33) {
        setActiveIndex(0);
      } else if (latest < 0.66) {
        setActiveIndex(1);
      } else {
        setActiveIndex(2);
      }
    });

    return unsubscribe;
  }, [scrollYProgress]);

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-white" />,
      title: "Neural Sync",
      description: "Direct neural interface connects your thoughts to digital systems in real-time. Experience seamless integration between mind and machine.",
      range: [0.0, 0.3, 0.33] as [number, number, number]
    },
    {
      icon: <Shield className="w-12 h-12 text-white" />,
      title: "Biometric Security",
      description: "Advanced biometric authentication uses your unique neural patterns. Your thoughts become the ultimate security key.",
      range: [0.33, 0.63, 0.66] as [number, number, number]
    },
    {
      icon: <Battery className="w-12 h-12 text-white" />,
      title: "Infinite Battery",
      description: "Revolutionary kinetic energy harvesting powers your device indefinitely. Never worry about charging again.",
      range: [0.66, 0.96, 1.0] as [number, number, number]
    }
  ];

  return (
    <section className="h-[300vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-cyan-900/20"
        />
        
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            progress={scrollYProgress}
            range={feature.range}
            isActive={activeIndex === index}
          />
        ))}
      </div>
    </section>
  );
}