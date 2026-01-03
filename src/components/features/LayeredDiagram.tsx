import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Database, Server, Smartphone, Globe, Lock, Cpu } from 'lucide-react';
export function LayeredDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  // Transform values for separating layers
  // As user scrolls, layers move apart vertically
  const layer1Y = useTransform(scrollYProgress, [0.2, 0.8], [0, -200]);
  const layer2Y = useTransform(scrollYProgress, [0.2, 0.8], [0, 0]);
  const layer3Y = useTransform(scrollYProgress, [0.2, 0.8], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);
  return <div ref={containerRef} className="h-[200vh] relative bg-gray-950 overflow-hidden">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Context Text */}
          <motion.div style={{
        opacity
      }} className="absolute top-20 left-0 right-0 text-center z-50 px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
            System Architecture
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Scroll to deconstruct the stack. Our layered approach ensures
            separation of concerns and scalability.
          </p>
        </motion.div>

        {/* The Stack */}
        <motion.div style={{
        scale,
        opacity
      }} className="relative w-[90%] max-w-4xl h-[600px] perspective-1000">
          {/* Layer 3: Infrastructure (Bottom) */}
          <motion.div style={{
          y: layer3Y,
          zIndex: 1
        }} className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-64 bg-gray-900/90 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl transform-gpu">
            <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-4">
              <div className="flex items-center space-x-3">
                <Database className="text-purple-500 h-6 w-6" />
                <h3 className="text-xl font-bold text-primary">
                  Data & Infrastructure Layer
                </h3>
              </div>
              <span className="text-xs font-mono text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
                BACKEND
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-gray-400 text-xs mb-1">Primary DB</div>
                <div className="text-primary font-mono">PostgreSQL</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-gray-400 text-xs mb-1">Cache</div>
                <div className="text-primary font-mono">Redis Cluster</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="text-gray-400 text-xs mb-1">Storage</div>
                <div className="text-primary font-mono">S3 Buckets</div>
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Logic (Middle) */}
          <motion.div style={{
          y: layer2Y,
          zIndex: 2
        }} className="absolute top-1/2 left-4 right-4 -translate-y-1/2 h-64 bg-gray-800/90 backdrop-blur-md border border-gray-600 rounded-2xl p-8 shadow-2xl transform-gpu">
            <div className="flex items-center justify-between mb-6 border-b border-gray-600 pb-4">
              <div className="flex items-center space-x-3">
                <Server className="text-blue-500 h-6 w-6" />
                <h3 className="text-xl font-bold text-primary">
                  Business Logic Layer
                </h3>
              </div>
              <span className="text-xs font-mono text-blue-400 bg-blue-900/30 px-2 py-1 rounded">
                API
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="text-gray-300 text-xs mb-1">Authentication</div>
                <div className="text-primary font-mono flex items-center gap-2">
                  <Lock className="w-3 h-3" /> OAuth 2.0
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="text-gray-300 text-xs mb-1">Processing</div>
                <div className="text-primary font-mono flex items-center gap-2">
                  <Cpu className="w-3 h-3" /> Workers
                </div>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
                <div className="text-gray-300 text-xs mb-1">Gateway</div>
                <div className="text-primary font-mono">GraphQL</div>
              </div>
            </div>
          </motion.div>

          {/* Layer 1: Presentation (Top) */}
          <motion.div style={{
          y: layer1Y,
          zIndex: 3
        }} className="absolute top-1/2 left-8 right-8 -translate-y-1/2 h-64 bg-panel-95 backdrop-blur-md border border-panel-10 rounded-2xl p-8 shadow-2xl transform-gpu">
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-3">
                <Globe className="text-indigo-600 h-6 w-6" />
                <h3 className="text-xl font-bold text-gray-900">
                  Presentation Layer
                </h3>
              </div>
              <span className="text-xs font-mono text-indigo-600 bg-indigo-100 px-2 py-1 rounded">
                CLIENT
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-panel-95 p-4 rounded-lg border border-panel-10">
                <div className="text-slate-400 text-xs mb-1">Web</div>
                <div className="text-primary font-mono">React / Next.js</div>
              </div>
              <div className="bg-panel-95 p-4 rounded-lg border border-panel-10">
                <div className="text-slate-400 text-xs mb-1">Mobile</div>
                <div className="text-primary font-mono flex items-center gap-2">
                  <Smartphone className="w-3 h-3" /> React Native
                </div>
              </div>
              <div className="bg-panel-95 p-4 rounded-lg border border-panel-10">
                <div className="text-slate-400 text-xs mb-1">State</div>
                <div className="text-primary font-mono">Zustand</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>;
}