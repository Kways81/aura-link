"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuraOverlay() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <style jsx>{`
        .aura-overlay::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.05) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.05) 3px
          );
          pointer-events: none;
          z-index: 1;
        }
        
        @keyframes flicker {
          0% { opacity: 0.98; }
          50% { opacity: 1.0; }
          100% { opacity: 0.99; }
        }
        
        .crt-flicker {
          animation: flicker 0.15s infinite;
        }
      `}</style>

      {/* Main overlay container with scanlines */}
      <div className="aura-overlay crt-flicker absolute inset-0" />
      
      {/* Scanline sweep */}
      <motion.div
        className="scanline-sweep absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary-500 to-transparent opacity-80"
        style={{
          boxShadow: '0 0 10px rgba(139, 92, 246, 0.8), 0 0 20px rgba(139, 92, 246, 0.4)'
        }}
        animate={{
          y: ['-100vh', '100vh']
        }}
        transition={{
          y: {
            duration: 8,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }
        }}
      />
      
      {/* Additional subtle vignette effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
        }}
      />
      
      {/* Random static noise overlay */}
      <motion.div
        className="absolute inset-0 opacity-3 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
        animate={{
          opacity: [0.02, 0.05, 0.02]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      />
    </div>
  );
}