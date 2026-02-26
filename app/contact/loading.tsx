import { Skeleton } from "@/components/ui/skeleton";
import { PageTemplate } from "@/components/global/template";

export default function Loading() {
    return (
        <>
            <PageTemplate title="Loading..." subtitle="Loading contact info" />
            <div className="py-4 sm:py-12 flex md:flex-row-reverse flex-col gap-8 justify-between w-full h-full">

                {/* Contact Info Skeleton */}
                <div className="flex flex-col gap-8 md:w-1/2 w-full mt-2">
                    {/* Location Block */}
                    <div className="flex items-start gap-4">
                        <Skeleton className="size-16 rounded-lg p-2 shrink-0 bg-primary/10" />
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-48" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>

                    {/* Connect Me Block */}
                    <div className="flex items-start gap-4">
                        <Skeleton className="size-16 rounded-lg border p-2 shrink-0 bg-primary/10" />
                        <div className="flex flex-col space-y-2 w-full">
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                </div>

                {/* Contact Form Skeleton */}
                <Skeleton className="md:w-[600px] w-full h-[450px] rounded-xl flex items-center justify-center bg-card border" />
            </div>
        </>
    );
}
