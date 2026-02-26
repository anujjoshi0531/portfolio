import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

export function useBlogFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const activeTags = useMemo(
        () => searchParams.get("tags")?.split(",").filter(Boolean) || [],
        [searchParams]
    );
    const activeDateFrom = searchParams.get("published_gte");
    const activeDateTo = searchParams.get("published_lte");

    const hasActiveFilters = activeTags.length > 0 || !!activeDateFrom || !!activeDateTo;

    const removeFilter = useCallback(
        (key: string, value?: string) => {
            const params = new URLSearchParams(searchParams.toString());

            if (key === "tags" && value) {
                const currentTags = params.get("tags")?.split(",").filter(Boolean) || [];
                const newTags = currentTags.filter((tag) => tag !== value);
                if (newTags.length > 0) {
                    params.set("tags", newTags.join(","));
                } else {
                    params.delete("tags");
                }
            } else {
                params.delete(key);
            }

            params.delete("page");
            router.push(`/blog?${params.toString()}`);
        },
        [searchParams, router]
    );

    const clearAllFilters = useCallback(() => {
        router.push("/blog");
    }, [router]);

    return {
        activeTags,
        activeDateFrom,
        activeDateTo,
        hasActiveFilters,
        removeFilter,
        clearAllFilters,
    };
}
