"use client";

import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  isActive: boolean;
  className?: string;
}

const GLITCH_SYMBOLS = ["!", "@", "#", "$", "%", "&", "*", "?"];

export default function GlitchText({ text, isActive, className = "" }: GlitchTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: false });
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasScrambled, setHasScrambled] = useState(false);
  const scrambleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const glitchIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Scramble effect when text enters viewport and becomes active
  useEffect(() => {
    if (isInView && isActive && !hasScrambled) {
      setHasScrambled(true);
      
      // Initial RGB split flash
      let flashCount = 0;
      const maxFlashes = 6;
      
      const flashInterval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 100);
        
        flashCount++;
        if (flashCount >= maxFlashes) {
          clearInterval(flashInterval);
        }
      }, 150);
      
      // Scramble effect
      let scrambleCount = 0;
      const maxScrambles = 20; // About 800ms at 40ms intervals
      
      const scrambleInterval = setInterval(() => {
        setDisplayText(text.split('').map(char => {
          if (Math.random() > 0.6) {
            return GLITCH_SYMBOLS[Math.floor(Math.random() * GLITCH_SYMBOLS.length)];
          }
          return char;
        }).join(''));
        
        scrambleCount++;
        
        if (scrambleCount >= maxScrambles) {
          clearInterval(scrambleInterval);
          setDisplayText(text);
        }
      }, 40);
      
      scrambleTimeoutRef.current = scrambleInterval;
    }
    
    return () => {
      if (scrambleTimeoutRef.current) {
        clearInterval(scrambleTimeoutRef.current);
      }
    };
  }, [isInView, isActive, text, hasScrambled]);

  // Reset scramble state when out of view
  useEffect(() => {
    if (!isInView && hasScrambled) {
      setHasScrambled(false);
      setDisplayText(text);
    }
  }, [isInView, hasScrambled, text]);

  // Random RGB split glitch effect
  useEffect(() => {
    const startGlitching = () => {
      glitchIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
          setIsGlitching(true);
          setTimeout(() => setIsGlitching(false), 150);
        }
      }, 3000); // Check every 3 seconds
    };

    if (isActive) {
      startGlitching();
    }

    return () => {
      if (glitchIntervalRef.current) {
        clearInterval(glitchIntervalRef.current);
      }
    };
  }, [isActive]);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const handleMouseEnter = () => {
    if (isActive) {
      x.set(2);
      y.set(-2);
      setIsGlitching(true);
      setTimeout(() => {
        x.set(-2);
        y.set(2);
      }, 75);
      setTimeout(() => {
        x.set(0);
        y.set(0);
        setIsGlitching(false);
      }, 150);
    }
  };

  return (
    <motion.h3
      ref={ref}
      className={`${className} font-mono cursor-pointer relative`}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseEnter={handleMouseEnter}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* RGB Split Effect */}
      {isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 opacity-90"
            style={{ 
              color: "#00FFFF",
              textShadow: "2px 0 #00FFFF, -2px 0 #FF00FF, 0 0 20px #00FFFF, 0 0 40px #00FFFF",
              transform: "translate(-2px, 2px)"
            }}
            animate={{ 
              x: [-2, 2, -2],
              opacity: [0.9, 0.7, 0.9]
            }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            {displayText}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 opacity-90"
            style={{ 
              color: "#FF00FF",
              textShadow: "2px 0 #FF00FF, -2px 0 #00FFFF, 0 0 20px #FF00FF, 0 0 40px #FF00FF",
              transform: "translate(2px, -2px)"
            }}
            animate={{ 
              x: [2, -2, 2],
              opacity: [0.9, 0.7, 0.9]
            }}
            transition={{ duration: 0.1 }}
            aria-hidden="true"
          >
            {displayText}
          </motion.span>
        </>
      )}
      
      {/* Main text with purple glow */}
      <span 
        className="relative z-10"
        style={{ 
          textShadow: isGlitching 
            ? "0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)"
            : "0 0 10px rgba(139, 92, 246, 0.6)"
        }}
      >
        {displayText}
      </span>
    </motion.h3>
  );
}