'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-header flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 bg-panel-5 p-8 rounded-2xl border border-panel-20">
                <h2 className="text-2xl font-bold text-primary">Something went wrong!</h2>
                <p className="text-secondary">
                    We apologize for the inconvenience. An unexpected error has occurred.
                </p>
                <div className="flex flex-col gap-3">
                    <Button
                        onClick={() => reset()}
                        variant="primary"
                    >
                        Try again
                    </Button>
                    <Button
                        onClick={() => window.location.href = '/'}
                        variant="outline"
                    >
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    );
}
