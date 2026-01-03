'use client';

import { useState } from 'react';
import { Linkedin, Twitter, Facebook, Mail, Link as LinkIcon, Check } from 'lucide-react';
import { Button } from './Button';

interface SocialShareProps {
  url: string;
  title: string;
  description?: string;
  buttons?: {
    linkedin?: { visible: boolean; text: string };
    twitter?: { visible: boolean; text: string };
    facebook?: { visible: boolean; text: string };
    email?: { visible: boolean; text: string };
    copyLink?: { visible: boolean; text: string };
  };
  customMessage?: string;
}

export function SocialShare({
  url,
  title,
  description = '',
  buttons = {},
  customMessage
}: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + url : url;
  const shareText = customMessage || title;

  const handleLinkedInShare = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(linkedinUrl, '_blank', 'width=600,height=600');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=600');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=600');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {buttons.linkedin?.visible && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleLinkedInShare}
          leftIcon={<Linkedin size={16} />}
        >
          {buttons.linkedin.text}
        </Button>
      )}

      {buttons.twitter?.visible && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleTwitterShare}
          leftIcon={<Twitter size={16} />}
        >
          {buttons.twitter.text}
        </Button>
      )}

      {buttons.facebook?.visible && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleFacebookShare}
          leftIcon={<Facebook size={16} />}
        >
          {buttons.facebook.text}
        </Button>
      )}

      {buttons.email?.visible && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleEmailShare}
          leftIcon={<Mail size={16} />}
        >
          {buttons.email.text}
        </Button>
      )}

      {buttons.copyLink?.visible && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
          leftIcon={copied ? <Check size={16} /> : <LinkIcon size={16} />}
        >
          {copied ? 'Copied!' : buttons.copyLink.text}
        </Button>
      )}
    </div>
  );
}
