import generateAboutMetadata from './metadata';

export const generateMetadata = generateAboutMetadata;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
