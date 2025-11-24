"use client";

import React, { useState, useEffect, useCallback } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { SectionTemplate } from "@/components/global/template";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { extractPlainText } from "@/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  company: string;
  position: string;
  rating: string;
  platform: string;
  project: string;
  avatar: string | null;
  review: string;
  date: string;
}

const TestimonialCardSkeleton = () => (
  <div className="text-center [grid-area:stack] min-w-64 mx-auto">
    <Skeleton className="block rounded-md p-4 text-md relative isolate">
      <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
      <Skeleton className="h-6 w-2/3 mx-auto" />
    </Skeleton>
    <div className="text-sm flex flex-col items-center gap-2 mt-6 duration-500">
      <Skeleton className="w-12 h-12 rounded-full" />
      <div>
        <Skeleton className="h-4 w-24 mx-auto mb-1" />
        <Skeleton className="h-3 w-16 mx-auto" />
      </div>
    </div>
  </div>
);

const TestimonialCard = ({
  testimonial,
  isVisible,
}: {
  testimonial: Testimonial;
  isVisible: boolean;
}) => {
  return (
    <div
      className={`text-center ${
        isVisible ? "" : "opacity-0"
      } [grid-area:stack] transition-all duration-700`}
    >
      <blockquote
        className={`block bg-muted hover:bg-muted rounded-md p-4 text-md relative isolate transition-all duration-500 ${
          isVisible ? "scale-100" : "scale-0"
        } before:absolute before:bg-muted before:w-6 before:h-6 before:rotate-45 before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:-z-10 before:transition before:duration-500 before:delay-500 ${
          isVisible ? "before:translate-y-0" : "before:-translate-y-4"
        }`}
      >
        {testimonial.review}
      </blockquote>
      <div
        className={`text-sm flex flex-col items-center gap-2 mt-6 transition-all duration-500 ${
          isVisible ? "translate-y-0" : "translate-y-24"
        }`}
      >
        <Avatar className="w-12 h-12">
          <AvatarImage src={testimonial.avatar || "/icon.webp"} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-bold capitalize">{testimonial.name}</p>
          <p className="text-xs">{testimonial.position}</p>
        </div>
      </div>
    </div>
  );
};

export default function TestimonialSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const transformNotionData = (notionData: any[]): Testimonial[] => {
    return notionData.map((item) => ({
      id: item.id,
      name: extractPlainText(item.properties.Name.rich_text) || "Anonymous",
      company: extractPlainText(item.properties.Company.rich_text) || "Unknown Company",
      position: extractPlainText(item.properties.Position.rich_text) || "Unknown Position",
      rating: item.properties.Rating.select?.name || "⭐⭐⭐⭐⭐ (5/5)",
      platform: item.properties.Platform.select?.name || "Unknown Platform",
      project: extractPlainText(item.properties.Project.rich_text) || "Unknown Project",
      avatar: item.properties.Avatar.url,
      review: extractPlainText(item.properties.Remark.title) || "No review provided",
      date: item.properties.Date.date?.start || new Date().toISOString().split("T")[0],
    }));
  };

  useEffect(() => {
    const fetchTestimonial = async () => {
      try {
        const res = await fetch("api/testimonial", {
          headers: {
            'Cache-Control': 'max-age=3600',
          },
        });
        const data = await res.json();
        const transformedData = transformNotionData(data);

        setTestimonials(transformedData);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonial();
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);

    return () => clearInterval(interval);
  }, [handleNext, testimonials.length]);

  return (
    <SectionTemplate
      title="Testimonials"
      subtitle="What others say about me"
      className="lg:flex items-baseline justify-between"
    >
      <div className="lg:w-4/5 mx-auto mt-6 sm:grid grid-cols-[40px_auto_40px] [grid-template-areas:'nav-left_slider_nav-right'] gap-4 md:gap-6">
        <button
          onClick={handlePrev}
          disabled={loading || testimonials.length === 0}
          aria-label="Previous testimonial"
          className="[grid-area:nav-left] hidden sm:block group before:absolute before:inset-px before:transition-all before:duration-300 before:-z-10 before:rounded-full hover:before:inset-full before:bg-primary rounded-full w-10 h-10 shrink-0 relative isolate bg-background md:mt-4 m-auto text-background text-2xl transition-all delay-300 hover:bg-background border-primary border-2"
        >
          <FaAngleLeft className="m-auto text-background group-hover:text-primary" />
        </button>
        <div className="grid w-full">
          {loading ? (
            <TestimonialCardSkeleton />
          ) : (
            testimonials.map((t, idx) => (
              <TestimonialCard
                key={t.id}
                testimonial={t}
                isVisible={idx === currentIndex}
              />
            ))
          )}
        </div>
        <button
          onClick={handleNext}
          disabled={loading || testimonials.length === 0}
          aria-label="Next testimonial"
          className="[grid-area:nav-right] hidden sm:block group before:absolute before:inset-px before:transition-all before:duration-300 before:-z-10 before:rounded-full hover:before:inset-full before:bg-primary rounded-full w-10 h-10 shrink-0 relative isolate bg-background md:mt-4 m-auto text-background text-2xl transition-all delay-300 hover:bg-background border-primary border-2"
        >
          <FaAngleRight className="m-auto text-background group-hover:text-primary" />
        </button>
      </div>
    </SectionTemplate>
  );
}
