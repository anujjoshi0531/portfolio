"use client"
import { SectionTemplate } from "@/components/global/template"
import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import BlogCard from "@/components/blog/blog-card"
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"
import { MagnetBtn } from "@/components/animate/MagnetBtn"
import { MdArrowOutward } from "react-icons/md"
import { cn } from "@/lib/utils"
import BlogCardSkeleton from "@/components/blog/blog-card-skeleton"
import { Card } from "@/components/ui/card"
import ErrorCard from "../global/Error-Card"

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
    className={cn(
      "cursor-pointer transform font-bold bg-primary",
      "ring-2 ring-primary border-2 rounded-full p-1 border-background hover:text-primary duration-150",
      "absolute top-1/2 -translate-y-1/2 z-10 group",
      "size-12 rounded-full",
      "bg-primary/80 backdrop-blur-md",
      "shadow-lg",
      "hover:bg-primary",
      "disabled:opacity-0",
      "transition-all duration-300 ease-out",
      "hover:scale-110 active:scale-95",
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

// Scroll indicator dots
const ScrollIndicator = ({
  totalItems,
  currentIndex,
  onDotClick,
}: {
  totalItems: number
  currentIndex: number
  onDotClick: (index: number) => void
}) => (
  <div className="flex justify-center mt-6 space-x-2">
    {Array.from({ length: Math.ceil(totalItems / 2) }).map((_, index) => (
      <button
        key={index}
        onClick={() => onDotClick(index)}
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

export default function BlogSection() {
  const [blogs, setBlogs] = useState<QueryDatabaseResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ limit: 5 }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch blogs")
        }

        const data = await response.json()
        setBlogs(data)
      } catch (error) {
        console.error("Error fetching blogs:", error)
        setError("Failed to load blogs. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Update scroll button states
  const updateScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370 // Card width + gap
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      })

      // Update current index for indicator
      const newIndex = Math.round(newScrollLeft / scrollAmount)
      setCurrentIndex(Math.max(0, newIndex))
    }
  }

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370 * index * 2 // Approximate scroll position
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
      setCurrentIndex(index * 2)
    }
  }

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", updateScrollButtons)
      updateScrollButtons() // Initial check

      return () => container.removeEventListener("scroll", updateScrollButtons)
    }
  }, [blogs])

  const renderContent = () => {
    if (error) {
      return <ErrorCard />
    }

    if (loading) {
      return (
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (!blogs || !blogs.results || blogs.results.length === 0) {
      return (
          <Card className="bg-muted/30 backdrop-blur-sm border border-border/50 rounded-2xl p-8 px-12 text-center max-w-md mx-auto">
            <Sparkles className="size-16 text-muted-foreground mx-auto" />
            <div className="text-2xl font-semibold">No blogs yet</div>
            <p className="text-muted-foreground">Check back soon for fresh content and insights!</p>
          </Card>
      )
    }

    return (
      <>
        {blogs.results.map((blog, index) => (
          <div
            key={blog.id}
            className="flex-shrink-0 w-[350px] transform transition-all duration-300 hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <BlogCard key={blog.id} blog={blog} />
          </div>
        ))}
        <div className="flex justify-center items-center min-w-[350px] p-4">
            <Link href="/blog" className="relative">
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

  const totalItems = blogs?.results?.length || 0

  return (
    <SectionTemplate title="Recent Blogs" subtitle="Insights, Thoughts, and Stories">
      <div className="relative group">
        {/* Gradient overlay for smooth edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Main scroll container */}
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

        {/* Navigation buttons */}
        {!loading && !error && totalItems > 0 && (
          <>
            <ScrollButton direction="left" onClick={() => scroll("left")} disabled={!canScrollLeft} />
            <ScrollButton direction="right" onClick={() => scroll("right")} disabled={!canScrollRight} />
          </>
        )}

        {/* Scroll indicator */}
        {!loading && !error && totalItems > 2 && (
          <ScrollIndicator totalItems={totalItems} currentIndex={currentIndex} onDotClick={scrollToIndex} />
        )}
      </div>
    </SectionTemplate>
  )
}
