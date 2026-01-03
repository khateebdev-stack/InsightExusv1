import * as MetadataFile from './metadata';
import React from 'react';

const generateFn = (MetadataFile as any).generateMetadata || (MetadataFile as any).default;
export const generateMetadata = generateFn;

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
