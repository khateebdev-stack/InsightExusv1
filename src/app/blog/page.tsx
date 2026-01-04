'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import blogData from '@/content/blog.json';

export default function BlogPage() {
  const { hero, posts, newsletter } = blogData;

  return (
    <main className="w-full">
      {/* Hero Section */}
      {hero.visibility && (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
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

      {/* Featured Posts */}
      <section className="py-16 md:py-24 bg-header">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary text-center mb-12"
          >
            Featured Articles
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.filter((post: any) => post.visibility).map((post: any, idx: number) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-lg bg-panel-5 border border-panel-10 overflow-hidden hover:border-[rgb(var(--accent-cyan))]/50 transition cursor-pointer group"
              >
                {post.image && (
                  <div className="h-48 md:h-64 bg-panel-10 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    <span className="text-xs bg-[rgb(var(--accent-cyan))]/20 text-[rgb(var(--accent-cyan))] px-2 py-1 rounded">
                      {post.category}
                    </span>
                    {post.tags?.slice(0, 2).map((tag: string, tidx: number) => (
                      <span key={tidx} className="text-xs bg-panel-10 text-secondary px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/blog/${post.slug}` as any}>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-[rgb(var(--accent-cyan))] transition">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-secondary text-sm mb-4">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-sm text-secondary">
                    <div>
                      <span className="font-semibold text-primary">{post.author}</span>
                      <span> • {post.publishDate} • {post.readingTime} min read</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      {newsletter.visibility && (
        <section className="py-16 md:py-24 bg-panel-5">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {newsletter.headline}
              </h2>
              <p className="text-secondary text-lg mb-8">
                {newsletter.description}
              </p>

              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-panel-10 border border-panel-20 text-primary placeholder:text-muted focus:outline-none focus:border-[rgb(var(--accent-cyan))] transition"
                />
                <Button size="lg">
                  {newsletter.buttonText || 'Subscribe'}
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section - Removed as it's not present in blog.json */
        /*
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
       */
      }
    </main>
  );
}
