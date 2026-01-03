import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import navigationData from '@/content/navigation.json';
import servicesData from '@/content/services.json';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Get visible services from services.json
  const visibleServices = servicesData.services
    .filter(service => service.visibility === true)
    .slice(0, 5)
    .map(service => ({
      name: service.title,
      path: `/services/${service.slug}`
    }));

  // Build footer links with Services from services.json
  const footerLinks = {
    Services: visibleServices,
    ...navigationData.footer
  };

  // Filter out invisible links
  const filteredFooterLinks = Object.fromEntries(
    Object.entries(footerLinks).map(([category, links]) => [
      category,
      links.filter((link: any) => link.visible !== false)
    ])
  );
  return <footer className="relative bg-header border-t  border-panel-10 pt-5 pb-6 overflow-hidden">
      {/* Background Glows */}
      {/* <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-900/20 rounded-full blur-[100px] pointer-events-none" /> */}

      <div className="max-w-7xl mx-auto site-padding relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image 
                src={navigationData.logo.path} 
                alt={navigationData.logo.alt}
                width={32}
                height={32}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-primary">Insightexus</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Engineering scalable digital systems from idea to enterprise-grade
              execution. Architecting the future of web, mobile, and AI.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-secondary hover:text-cyan-400 transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-cyan-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-cyan-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-secondary hover:text-cyan-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(filteredFooterLinks).map(([category, links]) => <div key={category}>
              <h3 className="text-primary font-semibold mb-6">{category}</h3>
              <ul className="space-y-4">
                {links.map(link => <li key={link.name}>
                    <Link href={link.path as any} className="text-secondary hover:text-cyan-400 text-sm transition-colors flex items-center group">
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 transition-all group-hover:w-full" />
                      </span>
                    </Link>
                  </li>)}
              </ul>
            </div>)}
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 md:pt-6 border-t border-panel-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-secondary text-sm">
            © {currentYear} Insightexus. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-secondary">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>;
}