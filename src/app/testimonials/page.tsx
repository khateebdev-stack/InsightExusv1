'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import testimonialsData from '@/content/testimonials.json';

export default function TestimonialsPage() {
  const { hero, testimonials, stats, caseStudySection, cta } = testimonialsData;

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

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.filter((t: any) => t.visibility).map((testimonial: any, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-lg border transition ${
                  testimonial.featured
                    ? 'bg-blue-500/10 border-blue-500/50 md:col-span-2 lg:col-span-3'
                    : 'bg-gray-800 border-gray-700'
                }`}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating || 5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.title} at {testimonial.company}
                  </div>
                  {testimonial.industry && (
                    <div className="text-xs text-gray-500 mt-1">
                      {testimonial.industry}
                    </div>
                  )}
                </div>

                {/* Results */}
                {testimonial.results && (
                  <div className="mt-4 pt-4 border-t border-gray-700 text-sm text-gray-300">
                    <span className="font-semibold text-blue-400">Result:</span> {testimonial.results}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats.visibility && (
        <section className="py-16 md:py-24 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.items.filter((item: any) => item.visibility).map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-blue-500 mb-2">
                    {item.number}
                  </div>
                  <div className="text-white font-semibold">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Section */}
      {caseStudySection.visibility && (
        <section className="py-16 md:py-24 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {caseStudySection.headline}
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {caseStudySection.description}
              </p>
              <Link href={caseStudySection.cta.href}>
                <Button size="lg">
                  {caseStudySection.cta.text}
                </Button>
              </Link>
            </motion.div>
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
                {cta.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                <Link href={cta.buttons[0].href}>
                  <Button size="lg">
                    {cta.buttons[0].text}
                  </Button>
                </Link>
                {cta.buttons[1] && (
                  <Link href={cta.buttons[1].href}>
                    <Button variant="secondary" size="lg">
                      {cta.buttons[1].text}
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
