
import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
    return (
        <div className="pt-32 pb-20 site-padding max-w-7xl mx-auto min-h-screen bg-header">
            <div className="space-y-8">
                <Skeleton className="h-12 w-3/4 max-w-lg" />
                <Skeleton className="h-24 w-full" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="space-y-4 border border-panel-20 bg-panel-5 p-6 rounded-xl">
                            <Skeleton className="h-48 w-full rounded-lg" />
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
