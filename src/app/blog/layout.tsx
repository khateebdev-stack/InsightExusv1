import generateBlogMetadata from './metadata';

export const generateMetadata = generateBlogMetadata;

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
