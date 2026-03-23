"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 100 }}
        viewport={{ once: true }}
        className="text-center z-10 max-w-4xl mx-auto px-8"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tight"
        >
          Ready to Connect?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-gray-400 mb-12 font-light leading-relaxed"
        >
          Join the revolution. Be among the first to experience the future of human-computer interaction.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
          className="px-12 py-6 bg-gradient-to-r from-primary-600 to-primary-700 text-white text-xl font-bold rounded-full border border-primary-500 hover:border-primary-400 transition-all duration-300 relative overflow-hidden group"
        >
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "0%" }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-primary-600"
          />
          <span className="relative z-10">Reserve Yours</span>
        </motion.button>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-gray-500"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Limited Edition</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
            <span>Free Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse" />
            <span>2 Year Warranty</span>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-t from-primary-900/20 via-transparent to-cyan-900/20"
      />
      
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 100%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.2) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0"
      />
    </section>
  );
}