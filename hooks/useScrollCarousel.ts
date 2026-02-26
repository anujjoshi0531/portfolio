import { useState, useRef, useCallback, useEffect } from "react";

export function useScrollCarousel(itemWidth: number = 370) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const updateScrollButtons = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    const scroll = useCallback(
        (direction: "left" | "right") => {
            if (scrollContainerRef.current) {
                const newScrollLeft =
                    direction === "left"
                        ? scrollContainerRef.current.scrollLeft - itemWidth
                        : scrollContainerRef.current.scrollLeft + itemWidth;

                scrollContainerRef.current.scrollTo({
                    left: newScrollLeft,
                    behavior: "smooth",
                });

                const newIndex = Math.round(newScrollLeft / itemWidth);
                setCurrentIndex(Math.max(0, newIndex));
            }
        },
        [itemWidth]
    );

    const scrollToIndex = useCallback(
        (index: number) => {
            if (scrollContainerRef.current) {
                const scrollAmount = itemWidth * index * 2;
                scrollContainerRef.current.scrollTo({
                    left: scrollAmount,
                    behavior: "smooth",
                });
                setCurrentIndex(index * 2);
            }
        },
        [itemWidth]
    );

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", updateScrollButtons);
            updateScrollButtons();
            return () => container.removeEventListener("scroll", updateScrollButtons);
        }
    }, [updateScrollButtons]);

    return {
        currentIndex,
        canScrollLeft,
        canScrollRight,
        scrollContainerRef,
        scroll,
        scrollToIndex,
    };
}
