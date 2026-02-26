import { Skeleton } from "@/components/ui/skeleton";
import { PageTemplate } from '@/components/global/SectionTemplate';

export default function Loading() {
    return (
        <>
            <PageTemplate title="Loading..." subtitle="Loading blogs" />

            {/* Search and Controls Skeleton */}
            <div className="flex w-full justify-between gap-2 items-center flex-wrap mb-8">
                <div className="w-full max-w-xl md:max-w-2xl">
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-10 w-24" /> {/* Filter Button */}
                    <Skeleton className="h-10 w-10 hidden md:block" /> {/* Grid/List Toggle */}
                </div>
            </div>

            {/* Results Count Skeleton */}
            <Skeleton className="h-4 w-40 mb-4" />

            {/* Blog Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="flex flex-col space-y-3">
                        <Skeleton className="h-[250px] w-full rounded-xl" />
                        <div className="flex gap-2">
                            <Skeleton className="h-6 w-16 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                        <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center space-x-2">
                                <Skeleton className="h-6 w-6 rounded-full" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-4 w-24" />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
