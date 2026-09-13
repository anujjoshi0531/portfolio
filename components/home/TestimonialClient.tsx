"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SectionTemplate } from '@/components/global/SectionTemplate';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib";
import { LinkPreview } from "../animate/LinkPreview";

interface Testimonial {
    id: string;
    name: string;
    company: string;
    position: string;
    rating: string;
    project: string;
    avatar: string | null;
    review: string;
    contact: string;
    date: string;
}

const TestimonialCard = ({
    testimonial,
    isVisible,
}: {
    testimonial: Testimonial;
    isVisible: boolean;
}) => {
    return (
        <div
            className={`text-center ${isVisible ? "" : "opacity-0"
                } [grid-area:stack] transition-all duration-700`}
        >
            <blockquote
                className={`block bg-muted hover:bg-muted rounded-md p-4 text-md relative isolate transition-all duration-500 ${isVisible ? "scale-100" : "scale-0"
                    } before:absolute before:bg-muted before:w-6 before:h-6 before:rotate-45 before:-bottom-2 before:left-2/4 before:-translate-x-2/4 before:-z-10 before:transition before:duration-500 before:delay-500 ${isVisible ? "before:translate-y-0" : "before:-translate-y-4"
                    }`}
            >
                {testimonial.review}
            </blockquote>
            <div
                className={`text-sm flex flex-col items-center gap-2 mt-6 transition-all duration-500 ${isVisible ? "translate-y-0" : "translate-y-24"
                    }`}
            >
                {testimonial.contact ? (
                    <LinkPreview
                        url={testimonial.contact}
                        title={testimonial.name}
                        ariaLabel={`Visit ${testimonial.name}'s profile`}
                        className="flex flex-col items-center gap-2 transition-opacity hover:opacity-80"
                    >
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={testimonial.avatar || "/icon.webp"}
                                width={48}
                                height={48}
                                alt={testimonial.name}
                            />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold capitalize inline-flex items-center gap-1">
                                {testimonial.name}
                            </p>
                            <p className="text-xs">{testimonial.position}</p>
                        </div>
                    </LinkPreview>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <Avatar className="w-12 h-12">
                            <AvatarImage
                                src={testimonial.avatar || "/icon.webp"}
                                width={48}
                                height={48}
                                alt={testimonial.name}
                            />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-bold capitalize inline-flex items-center gap-1">
                                {testimonial.name}
                            </p>
                            <p className="text-xs">{testimonial.position}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

interface TestimonialClientProps {
    testimonials: Testimonial[];
}

export default function TestimonialClient({ testimonials }: TestimonialClientProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

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

    if (testimonials.length === 0) {
        return null;
    }

    return (
        <SectionTemplate
            title="Testimonials"
            subtitle="What others say about me"
            id="testimonials"
            className="lg:flex items-baseline justify-between"
        >
            <div className="lg:w-4/5 mx-auto mt-6 sm:grid grid-cols-[40px_auto_40px] items-center [grid-template-areas:'nav-left_slider_nav-right'] gap-4 md:gap-6 min-h-[220px]">
                <button
                    onClick={handlePrev}
                    disabled={testimonials.length === 0}
                    aria-label="Previous testimonial"
                    className={cn("navButtonClasses group", "[grid-area:nav-left]")}
                >
                    <ChevronLeft className="m-auto size-4 text-background group-hover:text-primary" />
                </button>
                <div className="grid w-full">
                    {testimonials.map((t, idx) => (
                        <TestimonialCard
                            key={t.id}
                            testimonial={t}
                            isVisible={idx === currentIndex}
                        />
                    ))}
                </div>
                <button
                    onClick={handleNext}
                    disabled={testimonials.length === 0}
                    aria-label="Next testimonial"
                    className={cn("navButtonClasses group", "[grid-area:nav-right]")}
                >
                    <ChevronRight className="m-auto size-4 text-background group-hover:text-primary" />
                </button>
            </div>
        </SectionTemplate>
    );
}
