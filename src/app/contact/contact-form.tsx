import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastContext';

interface Field {
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    options?: { value: string; label: string }[];
    rows?: number;
    width?: 'full' | 'half'; // Add this if JSON supports it, otherwise default logic
    defaultChecked?: boolean;
}

interface ContactFormProps {
    fields: Field[];
    submitText?: string;
    submittingText?: string;
    successMessage?: string;
    privacyText?: string;
}

export function ContactForm({
    fields,
    submitText = 'Send Message',
    submittingText = 'Sending...',
    successMessage = 'Message sent successfully!',
    privacyText
}: ContactFormProps) {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        if (!formRef.current) return;

        try {
            const formData = new FormData(formRef.current);

            // Special handling for file input if needed, but FormData usually captures it automatically
            // if the input has a name attribute.

            const response = await fetch('/api/contact', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setIsSuccess(true);
            toast({
                type: 'success',
                title: 'Message Sent',
                message: successMessage,
            });
        } catch (err: any) {
            console.error('Contact Form Error:', err);
            const errorMessage = err.message || 'Failed to send message. Please try again later.';
            setError(errorMessage);
            toast({
                type: 'error',
                title: 'Submission Failed',
                message: errorMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6 bg-panel-5 rounded-2xl border border-panel-10"
            >
                <div className="flex justify-center">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                        <Check className="w-8 h-8 text-green-500" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-xl font-bold text-primary">Message Sent!</h3>
                    <p className="text-secondary max-w-xs mx-auto">{successMessage}</p>
                </div>
                <Button onClick={() => setIsSuccess(false)} variant="outline" className="mt-4">
                    Send Another Message
                </Button>
            </motion.div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {fields.map((field, index) => {
                    // Logic for column span


                    const isHalfWidth = field.name.toLowerCase().includes('name') && !field.name.toLowerCase().includes('company');

                    return (
                        <div
                            key={index}
                            className={`${isHalfWidth ? 'col-span-1' : 'col-span-1 md:col-span-2'}`}
                        >
                            <label htmlFor={field.name} className="block text-sm font-medium text-secondary mb-1.5 ml-1">
                                {field.label} {field.required && <span className="text-[rgb(var(--accent-cyan))]">*</span>}
                            </label>

                            {field.type === 'textarea' ? (
                                <textarea
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    rows={field.rows || 4}
                                    className="w-full bg-panel-5 border border-panel-20 rounded-lg px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-cyan))]/50 focus:border-[rgb(var(--accent-cyan))]/50 transition-all resize-y min-h-[100px]"
                                />
                            ) : field.type === 'select' ? (
                                <div className="relative">
                                    <select
                                        id={field.name}
                                        name={field.name}
                                        required={field.required}
                                        defaultValue=""
                                        className="w-full bg-panel-5 border border-panel-20 rounded-lg px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-cyan))]/50 focus:border-[rgb(var(--accent-cyan))]/50 transition-all cursor-pointer"
                                    >
                                        <option value="" disabled>Select an option</option>
                                        {field.options?.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ) : field.type === 'radio' ? (
                                <div className="flex flex-wrap gap-4 pt-1">
                                    {field.options?.map((opt) => (
                                        <label key={opt.value} className="flex items-center space-x-2.5 cursor-pointer group">
                                            <div className="relative w-5 h-5 flex-shrink-0">
                                                <input
                                                    type="radio"
                                                    name={field.name}
                                                    value={opt.value}
                                                    required={field.required}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-5 h-5 rounded-full border-2 border-panel-30 peer-checked:border-[rgb(var(--accent-cyan))] transition-all"></div>
                                                <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-[rgb(var(--accent-cyan))] scale-0 peer-checked:scale-100 transition-transform"></div>
                                            </div>
                                            <span className="text-secondary group-hover:text-primary transition-colors text-sm">{opt.label}</span>
                                        </label>
                                    ))}
                                </div>
                            ) : field.type === 'checkbox' ? (
                                <label className="flex items-center space-x-3 cursor-pointer group pt-1">
                                    <input
                                        type="checkbox"
                                        name={field.name}
                                        defaultChecked={field.defaultChecked}
                                        required={field.required}
                                        className="w-5 h-5 rounded bg-panel-5 border-panel-30 text-[rgb(var(--accent-cyan))] focus:ring-[rgb(var(--accent-cyan))]/50 focus:ring-offset-0"
                                    />
                                    <span className="text-sm text-secondary group-hover:text-primary transition-colors leading-tight select-none">
                                        {field.label}
                                    </span>
                                </label>
                            ) : field.type === 'file' ? (
                                <div className="relative group">
                                    <input
                                        type="file"
                                        id={field.name}
                                        name={field.name}
                                        required={field.required}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <div className="flex items-center gap-3 p-3 bg-panel-5 border border-panel-20 border-dashed rounded-lg group-hover:border-[rgb(var(--accent-cyan))]/50 transition-colors">
                                        <div className="w-10 h-10 rounded-full bg-panel-10 flex items-center justify-center text-[rgb(var(--accent-cyan))]">
                                            <Upload className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm text-primary font-medium">Click to upload file</p>
                                            <p className="text-xs text-secondary">Max 2MB (PDF, JPG, PNG)</p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <input
                                    id={field.name}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    required={field.required}
                                    className="w-full bg-panel-5 border border-panel-20 rounded-lg px-4 py-3 text-primary placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent-cyan))]/50 focus:border-[rgb(var(--accent-cyan))]/50 transition-all"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20"
                    >
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <p>{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="pt-2 space-y-4">
                <Button
                    type="submit"
                    className="w-full text-base sm:text-lg h-12"
                    disabled={isSubmitting}
                    isLoading={isSubmitting}
                    rightIcon={!isSubmitting && <ArrowRight className="w-5 h-5" />}
                >
                    {isSubmitting ? submittingText : submitText}
                </Button>

                {privacyText && (
                    <p className="text-xs text-center text-muted">
                        {privacyText}
                    </p>
                )}
            </div>
        </form>
    );
}
