"use client"
import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import BlogCard from "@/components/blog/blog-card"
import { MagnetBtn } from "@/components/animate/MagnetBtn"
import { MdArrowOutward } from "react-icons/md"
import { cn } from "@/lib"
import { Card } from "@/components/ui/card"

const ScrollButton = ({
    direction,
    onClick,
    disabled,
}: {
    direction: "left" | "right"
    onClick: () => void
    disabled: boolean
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        aria-label={`Scroll blog posts ${direction}`}
        className={cn(
            "navButtonStyles group",
            "absolute top-1/2 -translate-y-1/2 size-12",
            direction === "left" ? "-left-6" : "-right-6",
        )}
    >
        {direction === "left" ? (
            <ChevronLeft className="size-5 mx-auto text-background transition-colors duration-300" />
        ) : (
            <ChevronRight className="size-5 mx-auto text-background transition-colors duration-300" />
        )}
    </button>
)

const ScrollIndicator = ({
    totalItems,
    currentIndex,
    onDotClick,
}: {
    totalItems: number
    currentIndex: number
    onDotClick: (index: number) => void
}) => (
    <div className="flex justify-center mt-6 space-x-2" role="tablist" aria-label="Blog scroll indicators">
        {Array.from({ length: Math.ceil(totalItems / 2) }).map((_, index) => (
            <button
                key={index}
                onClick={() => onDotClick(index)}
                role="tab"
                aria-label={`Go to blog section ${index + 1}`}
                aria-selected={index === Math.floor(currentIndex / 2)}
                className={cn(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    index === Math.floor(currentIndex / 2)
                        ? "bg-primary w-6"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
            />
        ))}
    </div>
)

interface BlogClientProps {
    blogs: NotionBlogPage[]
}

export default function BlogClient({ blogs }: BlogClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const updateScrollButtons = useCallback(() => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
        }
    }, [])

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 370
            const newScrollLeft =
                direction === "left"
                    ? scrollContainerRef.current.scrollLeft - scrollAmount
                    : scrollContainerRef.current.scrollLeft + scrollAmount

            scrollContainerRef.current.scrollTo({
                left: newScrollLeft,
                behavior: "smooth",
            })

            const newIndex = Math.round(newScrollLeft / scrollAmount)
            setCurrentIndex(Math.max(0, newIndex))
        }
    }

    const scrollToIndex = (index: number) => {
        if (scrollContainerRef.current) {
            const scrollAmount = 370 * index * 2
            scrollContainerRef.current.scrollTo({
                left: scrollAmount,
                behavior: "smooth",
            })
            setCurrentIndex(index * 2)
        }
    }

    useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener("scroll", updateScrollButtons)
            updateScrollButtons()

            return () => container.removeEventListener("scroll", updateScrollButtons)
        }
    }, [updateScrollButtons])

    const renderContent = () => {
        if (!blogs || blogs.length === 0) {
            return (
                <Card className="bg-muted/30 backdrop-blur-xs border border-border/50 rounded-2xl p-8 px-12 text-center max-w-md mx-auto">
                    <Sparkles className="size-16 text-muted-foreground mx-auto" />
                    <div className="text-2xl font-semibold">No blogs yet</div>
                    <p className="text-muted-foreground">Check back soon for fresh content and insights!</p>
                </Card>
            )
        }

        return (
            <>
                {blogs.map((blog, index) => (
                    <div
                        key={blog.id}
                        className="shrink-0 w-[350px] transform transition-all duration-300 hover:scale-[1.02]"
                        style={{
                            animationDelay: `${index * 100}ms`,
                        }}
                    >
                        <BlogCard key={blog.id} blog={blog} />
                    </div>
                ))}
                <div className="flex justify-center items-center min-w-[350px] p-4">
                    <Link href="/blog" className="relative" aria-label="View all blog posts">
                        <MagnetBtn text="READ MORE &#183;READ MORE &#183;READ MORE &#183;READ MORE &#183;">
                            <div className="flex items-center space-x-2">
                                <MdArrowOutward />
                            </div>
                        </MagnetBtn>
                    </Link>
                </div>
            </>
        )
    }

    const totalItems = blogs?.length || 0

    return (
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

            <div
                ref={scrollContainerRef}
                className={cn(
                    "flex overflow-x-auto gap-2 px-8 py-4",
                    "scrollbar-hide scroll-smooth",
                    "snap-x snap-mandatory",
                )}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                    WebkitOverflowScrolling: "touch",
                }}
            >
                {renderContent()}
            </div>

            {totalItems > 0 && (
                <>
                    <ScrollButton direction="left" onClick={() => scroll("left")} disabled={!canScrollLeft} />
                    <ScrollButton direction="right" onClick={() => scroll("right")} disabled={!canScrollRight} />
                </>
            )}

            {totalItems > 2 && (
                <ScrollIndicator totalItems={totalItems} currentIndex={currentIndex} onDotClick={scrollToIndex} />
            )}
        </div>
    )
}
