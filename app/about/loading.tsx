import { Skeleton } from "@/components/ui/skeleton";
import { PageTemplate } from '@/components/global/SectionTemplate';

export default function Loading() {
    return (
        <>
            <PageTemplate title="Loading..." subtitle="Loading about" />

            {/* About Section Skeleton */}
            <div className="my-12 flex flex-col items-center justify-center space-y-8">
                <Skeleton className="h-64 pl-2 lg:w-4/5 w-full mx-auto" />
            </div>

            {/* Education Section Skeleton */}
            <div className="my-12 flex flex-col items-center justify-center space-y-8">
                <Skeleton className="h-10 w-48 mb-6" /> {/* Title */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-40 w-full" />
                </div>
            </div>

            {/* Skill Section Skeleton */}
            <div className="my-12 flex flex-col items-center justify-center space-y-8">
                <Skeleton className="h-10 w-48 mb-6" /> {/* Title */}
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl px-4">
                    <Skeleton className="h-24 w-32" />
                    <Skeleton className="h-24 w-32" />
                    <Skeleton className="h-24 w-32" />
                    <Skeleton className="h-24 w-32" />
                </div>
            </div>
        </>
    );
}
