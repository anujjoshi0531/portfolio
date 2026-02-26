import { Skeleton } from "@/components/ui/skeleton";
import { PageTemplate } from '@/components/global/SectionTemplate';

export default function Loading() {
    return (
        <>
            <PageTemplate title="Loading..." subtitle="Loading Projects" />
            <div className="py-12 min-h-screen">
                {/* Tabs skeleton */}
                <div className="flex flex-wrap justify-center mb-8 gap-2">
                    <Skeleton className="h-10 w-16" />
                    <Skeleton className="h-10 w-[72px]" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-[84px]" />
                </div>

                {/* Grid skeleton */}
                <div className="grid py-4 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div key={index} className="bg-card rounded-xl border p-4 space-y-4">
                            <Skeleton className="h-48 w-full rounded-md" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 flex-1 w-3/4" />
                                <Skeleton className="h-4 flex-1" />
                                <Skeleton className="h-4 w-4/5" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-16 rounded-full" />
                                <Skeleton className="h-6 w-16 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
