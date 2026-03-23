"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect } from "react";

export default function ProductReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1]);

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center z-10"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-white mb-8"
        >
          Meet the Future
        </motion.h2>
        
        <div className="relative w-80 h-80 md:w-96 md:h-96 mx-auto mb-8" style={{ perspective: "1000px" }}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-cyan-600 rounded-2xl opacity-20 blur-3xl" />
          
          <motion.div
            style={{ 
              rotateY,
              scale,
              transformStyle: "preserve-3d"
            }}
            animate={{
              y: [-15, 15, -15],
            }}
            transition={{
              y: {
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
            className="relative w-full h-full rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-primary-500/30"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1974&auto=format&fit=crop"
              alt="Aura Link Device"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 320px, 384px"
            />
            
            <motion.div
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
            />
          </motion.div>
        </div>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          Advanced neural interface technology seamlessly integrated into your daily life
        </motion.p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary-900/10 to-transparent"
      />
    </section>
  );
}