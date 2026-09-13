"use client";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";


import React from "react";
import {
    AnimatePresence,
    m,
    useMotionValue,
    useSpring,
} from "framer-motion";


type LinkPreviewProps = {
    children: React.ReactNode;
    title?: string;
    url?: string;
    className?: string;
    width?: number;
    height?: number;
    quality?: number;
    layout?: string;
    ariaLabel?: string;
} & (
        | { isStatic: true; imageSrc: string }
        | { isStatic?: false; imageSrc?: never }
    );

export const LinkPreview = ({
    children,
    title,
    url,
    className,
    width = 200,
    height = 125,
    isStatic = false,
    imageSrc = "",
    quality: _quality = 50,
    layout: _layout = "fixed",
    ariaLabel,
}: LinkPreviewProps) => {
    const [isOpen, setOpen] = React.useState(false);

    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);

    const translateX = useSpring(x, springConfig);

    const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
        const targetRect = event.currentTarget.getBoundingClientRect();
        const eventOffsetX = event.clientX - targetRect.left;
        const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2; // Reduce the effect to make it subtle
        x.set(offsetFromCenter);
    };

    if (!url || url.trim() === "" || url === "#") {
        return <span className={className}>{children}</span>;
    }

    let src: string;
    if (!isStatic) {
        const params = new URLSearchParams({
            url,
            screenshot: "true",
            meta: "false",
            embed: "screenshot.url",
            colorScheme: "dark",
            "viewport.isMobile": "true",
            "viewport.deviceScaleFactor": "1",
            "viewport.width": String(width * 3),
            "viewport.height": String(height * 3),
        }).toString();
        src = `https://api.microlink.io/?${params}`;
    } else {
        src = imageSrc;
    }

    return (
        <>
            {/* Preload the preview image when the card opens */}
            {isOpen && !isStatic && (
                <span className="hidden" aria-hidden="true">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} width={width} height={height} alt="" />
                </span>
            )}

            <HoverCardPrimitive.Root
                openDelay={50}
                closeDelay={100}
                onOpenChange={(open) => {
                    setOpen(open);
                }}
            >
                <HoverCardPrimitive.Trigger asChild>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseMove={handleMouseMove}
                        className={className}
                        aria-label={ariaLabel}
                    >
                        {children}
                    </a>
                </HoverCardPrimitive.Trigger>

                <HoverCardPrimitive.Content
                    className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
                    side="top"
                    align="center"
                    sideOffset={10}
                >
                    <AnimatePresence>
                        {isOpen && (
                            <m.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 20,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                className="shadow-xl rounded-xl"
                                style={{
                                    x: translateX,
                                }}
                            >
                                <a
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-1 bg-foreground border-[1px] border-transparent shadow rounded-lg hover:border-neutral-200 dark:hover:border-neutral-800"
                                    style={{ fontSize: 0 }}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={isStatic ? imageSrc : src}
                                        width={width}
                                        height={height}
                                        className="rounded-lg"
                                        alt={title || ""}
                                    />
                                </a>
                            </m.div>
                        )}
                    </AnimatePresence>
                </HoverCardPrimitive.Content>
            </HoverCardPrimitive.Root>
        </>
    );
};
