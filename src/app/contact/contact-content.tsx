'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import contactData from '@/content/contact.json';
import { ContactForm } from './contact-form';

export function ContactPageContent() {
    const data: any = contactData;
    const { hero, form, contactInfo, responseTime, faq, calendar, cta } = data;
    const fields = (form?.fields || []).filter((f: any) => f?.visibility !== false);

    return (
        <main className="min-h-screen bg-header text-primary overflow-x-hidden">
            {hero?.visibility && (
                <section className="px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-12 sm:pb-16 lg:pb-20 bg-gradient-to-br from-[rgb(var(--color-bg))] to-[rgb(var(--color-bg))]/90 relative">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[rgb(var(--accent-cyan))]/10 via-transparent to-transparent pointer-events-none" />
                    <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-xs sm:text-sm font-bold text-[rgb(var(--accent-cyan))] uppercase tracking-widest"
                        >
                            Contact
                        </motion.p>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
                        >
                            {hero.headline}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-base sm:text-xl text-secondary max-w-2xl mx-auto"
                        >
                            {hero.subheadline}
                        </motion.p>
                    </div>
                </section>
            )}

            <section className="px-4 sm:px-6 lg:px-10 py-10 sm:py-16 lg:py-20 max-w-7xl mx-auto">
                <div className="flex flex-col lg:grid lg:grid-cols-[1.1fr,0.9fr] gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="w-full p-5 sm:p-8 lg:p-10 rounded-3xl bg-panel-5 border border-panel-10 shadow-2xl shadow-black/5"
                    >
                        <div className="space-y-3 mb-8">
                            <h2 className="text-2xl sm:text-3xl font-bold">{form?.title}</h2>
                            <p className="text-secondary">{form?.description}</p>
                        </div>
                        <ContactForm
                            fields={fields}
                            submitText={form?.submitButtonText}
                            submittingText={form?.submittingButtonText}
                            successMessage={form?.successMessage}
                            privacyText={form?.privacyText}
                        />
                    </motion.div>

                    <div className="w-full space-y-8 lg:sticky lg:top-24">
                        {contactInfo?.visibility && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="p-6 sm:p-8 rounded-3xl bg-panel-5 border border-panel-10 flex flex-col gap-6"
                            >
                                <h3 className="text-xl font-bold">{contactInfo.headline}</h3>
                                <div className="flex flex-col gap-5">
                                    {(contactInfo.channels || [])
                                        .filter((c: any) => c.visibility !== false)
                                        .map((c: any, i: number) => (
                                            <div key={i} className="flex items-center gap-4 group">
                                                <div className="w-12 h-12 rounded-2xl bg-panel-10 flex items-center justify-center text-[rgb(var(--accent-cyan))] flex-shrink-0 group-hover:scale-110 group-hover:bg-[rgb(var(--accent-cyan))]/10 transition-all duration-300">
                                                    <span className="text-xl">{c.icon}</span>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-xs text-secondary font-medium uppercase tracking-wider">{c.label}</span>
                                                    {c.type === 'email' ? (
                                                        <a href={`mailto:${c.value}`} className="text-primary font-medium hover:text-[rgb(var(--accent-cyan))] transition-colors break-all">
                                                            {c.value}
                                                        </a>
                                                    ) : c.type === 'phone' ? (
                                                        <a href={`tel:${c.value}`} className="text-primary font-medium hover:text-[rgb(var(--accent-cyan))] transition-colors">
                                                            {c.value}
                                                        </a>
                                                    ) : c.type === 'linkedin' || c.type === 'twitter' ? (
                                                        <Link href={c.value} target="_blank" className="text-primary font-medium hover:text-[rgb(var(--accent-cyan))] transition-colors truncate block">
                                                            {c.value.replace(/^https?:\/\//, '')}
                                                        </Link>
                                                    ) : (
                                                        <span className="text-primary font-medium">{c.value}</span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            {responseTime?.visibility && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                    className="p-6 rounded-3xl bg-gradient-to-br from-[rgb(var(--accent-purple))]/5 to-[rgb(var(--accent-cyan))]/5 border border-panel-10"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{responseTime.headline}</h3>
                                    <p className="text-secondary text-sm mb-4 leading-relaxed">{responseTime.description}</p>
                                    <div className="pt-4 border-t border-panel-10 space-y-1">
                                        {responseTime.businessHours && <p className="text-primary text-sm font-medium">{responseTime.businessHours}</p>}
                                        {responseTime.expectation && <p className="text-secondary text-xs">{responseTime.expectation}</p>}
                                    </div>
                                </motion.div>
                            )}

                            {faq?.visibility && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="p-6 rounded-3xl bg-panel-5 border border-panel-10"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{faq.headline}</h3>
                                    <p className="text-secondary text-sm mb-4">{faq.description}</p>
                                    {faq.cta?.href && (
                                        <Link href={faq.cta.href} className="text-[rgb(var(--accent-cyan))] text-sm font-bold hover:opacity-80 transition inline-flex items-center gap-1">
                                            {faq.cta.text || 'View FAQ'} →
                                        </Link>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                {calendar?.visibility && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-6 sm:p-8 lg:p-10 rounded-3xl bg-panel-5 border border-panel-10 space-y-8"
                        id="calendar"
                    >
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <h3 className="text-2xl sm:text-3xl font-bold">{calendar.headline}</h3>
                            <p className="text-secondary">{calendar.description}</p>
                        </div>
                        <div className="w-full rounded-2xl overflow-hidden border border-panel-10 bg-white/5 shadow-inner min-h-[600px]">
                            <iframe src={calendar.embedUrl} className="w-full h-[700px]" loading="lazy" style={{ border: 0 }} />
                        </div>
                    </motion.div>
                )}

                {cta?.visibility && (
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[rgb(var(--accent-cyan))]/10 via-[rgb(var(--accent-purple))]/10 to-[rgb(var(--accent-cyan))]/10 border border-panel-10 text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(var(--accent-cyan),0.1),transparent_70%)] pointer-events-none" />
                        <div className="relative z-10 space-y-6">
                            <h3 className="text-3xl sm:text-4xl font-bold text-gradient-accent">{cta.headline}</h3>
                            <p className="text-secondary max-w-2xl mx-auto text-lg">{cta.subheadline}</p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                                {cta.primaryButton && (
                                    <Link href={cta.primaryButton.href} className="px-8 py-3.5 rounded-xl bg-[rgb(var(--accent-cyan))] text-white font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 transition-transform">
                                        {cta.primaryButton.text}
                                    </Link>
                                )}
                                {cta.secondaryButton && (
                                    <Link href={cta.secondaryButton.href} className="px-8 py-3.5 rounded-xl border border-panel-20 text-primary font-semibold hover:bg-panel-10 transition-colors">
                                        {cta.secondaryButton.text}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.section>
                )}
            </section>
        </main>
    );
}

