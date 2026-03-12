"use client";

import { cn } from "@/lib";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BLINK_FRAME_MS = [60, 60, 80, 60, 60, 60];
const MOVE_MAP = {
    neutral: "/blink/avatar1.webp",
    up: "/move/up.webp",
    down: "/move/down.webp",
    left: "/move/left.webp",
    right: "/move/right.webp",
    upLeft: "/move/up-left.webp",
    upRight: "/move/up-right.webp",
    downLeft: "/move/down-left.webp",
    downRight: "/move/down-right.webp",
} as const;
const BLINK_FRAMES = [
    "/blink/avatar1.webp",
    "/blink/avatar2.webp",
    "/blink/avatar3.webp",
    "/blink/avatar4.webp",
    "/blink/avatar3.webp",
    "/blink/avatar2.webp",
] as const;
type Direction = keyof typeof MOVE_MAP;

const IDLE_MS = 1000;

function getDirection(dx: number, dy: number): Direction {
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 30) return "neutral";

    // angle: 0° = right, +90° = up, ±180° = left, -90° = down
    const angleDeg = (Math.atan2(-dy, dx) * 180) / Math.PI;

    if (angleDeg >= -22.5 && angleDeg < 22.5) return "right";
    if (angleDeg >= 22.5 && angleDeg < 67.5) return "upRight";
    if (angleDeg >= 67.5 && angleDeg < 112.5) return "up";
    if (angleDeg >= 112.5 && angleDeg < 157.5) return "upLeft";
    if (angleDeg >= -67.5 && angleDeg < -22.5) return "downRight";
    if (angleDeg >= -112.5 && angleDeg < -67.5) return "down";
    if (angleDeg >= -157.5 && angleDeg < -112.5) return "downLeft";
    return "left"; // ±157.5 → ±180
}

export default function Logo({ className }: { className?: string }) {
    const [src, setSrc] = useState<string>(MOVE_MAP.neutral);

    const avatarRef = useRef<HTMLDivElement>(null);
    const isBlinking = useRef(false);
    const blinkTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const idleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const blinkScheduler = useRef<ReturnType<typeof setTimeout> | null>(null);
    const rafPending = useRef(false);
    const latestMouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const currentDir = useRef<Direction>("neutral");

    // ─────────────────────────────────────────────
    // Natural Blink Loop
    // Fires one blink sequence, then schedules the next
    // after a random 2–6 s interval.
    // ─────────────────────────────────────────────
    const runBlinkSequence = (frameIndex: number) => {
        if (!isBlinking.current) return;

        setSrc(BLINK_FRAMES[frameIndex]);

        const next = frameIndex + 1;
        if (next < BLINK_FRAMES.length) {
            blinkTimeout.current = setTimeout(
                () => runBlinkSequence(next),
                BLINK_FRAME_MS[frameIndex],
            );
        } else {
            // Sequence done — restore neutral and schedule next blink
            blinkTimeout.current = setTimeout(() => {
                if (!isBlinking.current) return;
                setSrc(MOVE_MAP.neutral);

                // Random gap before the next blink: 2 000 – 6 000 ms
                const nextIn = 2000 + Math.random() * 4000;
                blinkScheduler.current = setTimeout(
                    () => runBlinkSequence(0),
                    nextIn,
                );
            }, BLINK_FRAME_MS[frameIndex - 1]);
        }
    };

    const startBlinking = () => {
        isBlinking.current = true;
        setSrc(MOVE_MAP.neutral);

        // Short initial delay before the very first blink (0.5 – 1.5 s)
        const firstIn = 500 + Math.random() * 1000;
        blinkScheduler.current = setTimeout(() => runBlinkSequence(0), firstIn);
    };

    const stopBlinking = () => {
        isBlinking.current = false;
        if (blinkTimeout.current) clearTimeout(blinkTimeout.current);
        if (blinkScheduler.current) clearTimeout(blinkScheduler.current);
    };

    // ─────────────────────────────────────────────
    // Mouse Tracking — position relative to logo center
    // ─────────────────────────────────────────────
    useEffect(() => {
        // Start blinking immediately on mount
        startBlinking();

        const handleMove = (e: MouseEvent) => {
            latestMouse.current = { x: e.clientX, y: e.clientY };

            // Throttle direction updates to one per animation frame
            if (!rafPending.current) {
                rafPending.current = true;
                requestAnimationFrame(() => {
                    rafPending.current = false;

                    if (!avatarRef.current) return;

                    // Logo center in viewport coordinates
                    const rect = avatarRef.current.getBoundingClientRect();
                    const cx = rect.left + rect.width / 2;
                    const cy = rect.top + rect.height / 2;

                    const dx = latestMouse.current.x - cx;
                    const dy = latestMouse.current.y - cy;

                    const dir = getDirection(dx, dy);

                    // Only update state when direction actually changes
                    if (dir !== currentDir.current) {
                        currentDir.current = dir;
                        if (!isBlinking.current) {
                            setSrc(MOVE_MAP[dir]);
                        }
                    }
                });
            }

            // Stop blinking while mouse is moving
            if (isBlinking.current) {
                stopBlinking();
                setSrc(MOVE_MAP[currentDir.current]);
            }

            // Reset idle timer
            if (idleTimeout.current) clearTimeout(idleTimeout.current);
            idleTimeout.current = setTimeout(() => {
                currentDir.current = "neutral";
                startBlinking();
            }, IDLE_MS);
        };

        window.addEventListener("mousemove", handleMove, { passive: true });

        return () => {
            window.removeEventListener("mousemove", handleMove);
            stopBlinking();
            if (idleTimeout.current) clearTimeout(idleTimeout.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div
            ref={avatarRef}
            className={cn("relative overflow-hidden rounded-full shrink-0 size-12", className)}>
            <Image
                src={src}
                alt="Logo avatar"
                fill
                priority
                className="object-cover rounded-full"
            />
        </div>
    );
}