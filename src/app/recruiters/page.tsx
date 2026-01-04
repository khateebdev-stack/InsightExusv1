'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import recruitersData from '@/content/recruiters.json';

export default function RecruitersPage() {
  const { hero, culture, benefits, openPositions, interview, cta } = recruitersData;

  return (
    <main className="w-full">
      {/* Hero Section */}
      {hero.visibility && (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/30 to-black" />

          <div className="container relative z-10 mx-auto px-4 py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto text-center text-white space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {hero.headline}
              </h1>

              <p className="text-lg md:text-xl text-gray-300">
                {hero.subheadline}
              </p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Culture Section */}
      {culture.visibility && (
        <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              {culture.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {culture.highlights.map((highlight: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-300">
                    {highlight.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Benefits Section */}
      {benefits.visibility && (
        <section className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
            >
              {benefits.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefits.categories.map((category: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-black border border-gray-800"
                >
                  <h3 className="text-xl font-bold text-blue-400 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item: string, iidx: number) => (
                      <li key={iidx} className="text-gray-300 flex items-start">
                        <span className="text-blue-400 mr-3">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Open Positions */}
      {openPositions.visibility && (
        <section className="py-16 md:py-24 bg-black" id="open-positions">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                {openPositions.headline}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-lg"
              >
                {openPositions.description}
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {openPositions.positions.filter((job: any) => job.visibility).map((job: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg bg-gray-900 border border-gray-800 hover:border-blue-500/50 transition flex flex-col"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                        {job.level}
                      </span>
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                        {job.location}
                      </span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                        {job.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 flex-grow">
                    {job.description}
                  </p>

                  <div className="mb-4 pt-4 border-t border-gray-800">
                    <p className="text-sm text-gray-400 mb-2">
                      <span className="font-semibold text-blue-400">Compensation:</span> {job.compensation}
                    </p>
                  </div>

                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Interview Process */}
      {interview.visibility && (
        <section className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <motion.div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-4"
              >
                {interview.headline}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-gray-400 text-lg"
              >
                {interview.description}
              </motion.p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              {interview.stages.map((stage: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-8 flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg">
                      {stage.stage}
                    </div>
                    {idx < interview.stages.length - 1 && (
                      <div className="w-1 h-24 bg-blue-500/30 mt-2" />
                    )}
                  </div>

                  <div className="pb-8 flex-grow">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {stage.title}
                    </h3>
                    <p className="text-sm text-gray-400 mb-2">
                      {stage.duration}
                    </p>
                    <p className="text-gray-300 text-sm">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {cta.visibility && (
        <section className="py-20 md:py-32 bg-gradient-to-r from-blue-900 to-black">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {cta.headline}
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href={cta.primaryCta.href as any}>
                  <Button size="lg">
                    {cta.primaryCta.text}
                  </Button>
                </Link>
                {cta.secondaryCta && (
                  <Link href={cta.secondaryCta.href as any}>
                    <Button variant="secondary" size="lg">
                      {cta.secondaryCta.text}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
