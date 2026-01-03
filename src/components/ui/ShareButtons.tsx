"use client";
import React from 'react';
import { Linkedin, Twitter, Facebook, Mail, Link as LinkIcon } from 'lucide-react';

interface ShareButtonsProps {
  url: string;
  title: string;
  text?: string;
  buttonsConfig?: any;
}

export default function ShareButtons({ url, title, text = '', buttonsConfig }: ShareButtonsProps) {
  const shareLinkedIn = () => {
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener');
  };

  const shareTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text || title)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener');
  };

  const shareFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank', 'noopener');
  };

  const shareEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${text || title}\n\n${url}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      // simple feedback — replace with toast if available
      alert('Link copied to clipboard');
    } catch (e) {
      console.error(e);
      alert('Unable to copy link');
    }
  };

  const cfg = buttonsConfig || { linkedin: { visible: true }, twitter: { visible: true }, facebook: { visible: true }, email: { visible: true }, copyLink: { visible: true } };

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-wrap w-full">
      {cfg.linkedin?.visible && (
        <button onClick={shareLinkedIn} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-panel-5 border border-panel-10 hover:bg-panel-6 text-xs sm:text-sm transition-colors">
          <Linkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
          <span className="hidden sm:inline">LinkedIn</span>
        </button>
      )}

      {cfg.twitter?.visible && (
        <button onClick={shareTwitter} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-panel-5 border border-panel-10 hover:bg-panel-6 text-xs sm:text-sm transition-colors">
          <Twitter className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 flex-shrink-0" />
          <span className="hidden sm:inline">Twitter</span>
        </button>
      )}

      {cfg.facebook?.visible && (
        <button onClick={shareFacebook} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-panel-5 border border-panel-10 hover:bg-panel-6 text-xs sm:text-sm transition-colors">
          <Facebook className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
          <span className="hidden sm:inline">Facebook</span>
        </button>
      )}

      {cfg.email?.visible && (
        <button onClick={shareEmail} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-panel-5 border border-panel-10 hover:bg-panel-6 text-xs sm:text-sm transition-colors">
          <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 flex-shrink-0" />
          <span className="hidden sm:inline">Email</span>
        </button>
      )}

      {cfg.copyLink?.visible && (
        <button onClick={copyLink} className="flex items-center gap-1 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md bg-panel-5 border border-panel-10 hover:bg-panel-6 text-xs sm:text-sm transition-colors">
          <LinkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-300 flex-shrink-0" />
          <span className="hidden sm:inline">Copy Link</span>
        </button>
      )}
    </div>
  );
}
