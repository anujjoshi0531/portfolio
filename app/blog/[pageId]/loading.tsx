import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="max-w-4xl mx-auto px-4 md:px-8 mt-4 md:mt-12 w-full animate-in fade-in duration-500">

            {/* Hero Image */}
            <Skeleton className="w-full h-[250px] md:h-[400px] mb-12" />

            {/* Article Header */}
            <div className="space-y-6 mb-12">
                {/* Title */}
                <Skeleton className="h-10 md:h-14 w-full" />
                <Skeleton className="h-10 md:h-14 w-3/4" />

                {/* Metadata section */}
                <div className="flex flex-wrap items-center gap-4 mt-8 pb-8 border-b">
                    <Skeleton className="h-10 w-10 shrink-0" /> {/* Author image */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                    </div>
                    <div className="flex gap-2 ml-auto">
                        <Skeleton className="h-8 w-16" />
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
            </div>

            {/* Article Body paragraphs */}
            <div className="space-y-6">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />

                <div className="py-6">
                    <Skeleton className="h-8 w-2/3" /> {/* Header */}
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />

                <div className="py-6">
                    <Skeleton className="h-48 w-full rounded-md bg-muted/60" /> {/* Code block or Quote */}
                </div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
        </div>
    );
}
