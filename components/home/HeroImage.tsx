"use client";

import { m, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { containerVariants } from "@/lib/animate";
import { Volume2Icon, VolumeXIcon } from "lucide-react";

const HOVER_LINES = [
    "Hey there! I'm Anuj Joshi",
    "A software dev who loves building fast interfaces.",
    "I focus on modern and interactive web experiences.",
    "Feel free to explore my portfolio.",
    "Check out the projects I've built.",
    "See the technologies I work with.",
    "If something catches your interest...",
    "...I'd love to hear from you!",
    "Want to collaborate or ask a question?",
    "Just say hello – feel free to reach out.",
    "Thanks for visiting and enjoy exploring!",
] as const;

const ANGRY_MESSAGES = [
    "Ouch! Are you angry?",
    "Hey, that tickles!",
    "Stop poking me!",
    "I'm not a stress ball!",
    "Was that necessary?",
    "Help! I'm being attacked!",
    "Okay okay, I give up!",
    "You click like you mean it!",
] as const;

const SHAKE_VARIANTS: Variants = {
    idle: { x: 0, rotate: 0 },
    shake: {
        x: [0, -10, 12, -10, 8, -6, 4, 0],
        rotate: [0, -4, 4, -3, 3, -2, 1, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

export default function HeroImage() {
    const [message, setMessage] = useState("");
    const [isHovered, setIsHovered] = useState(false);
    const [shaking, setShaking] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isThinking, setIsThinking] = useState(false);
    const [activePoke, setActivePoke] = useState(0);

    const spriteRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressRef = useRef<HTMLInputElement>(null);

    // Refs for values needed inside timer callbacks (avoids stale closures)
    const isHoveredRef = useRef(false);
    const audioSourceLoaded = useRef(false);

    // Click-streak tracking
    const clickCount = useRef(0);
    const maxPokes = useRef(Math.floor(Math.random() * 2) + 5);
    const lastPokeDir = useRef<1 | 2>(1);
    const lastClickAt = useRef(0);

    // Timers
    const blinkTimer = useRef<ReturnType<typeof setTimeout>>();
    const idleTimer = useRef<ReturnType<typeof setTimeout>>();
    const thinkTimer = useRef<ReturnType<typeof setTimeout>>();
    const pokeTimer = useRef<ReturnType<typeof setTimeout>>();
    const shakeTimer = useRef<ReturnType<typeof setTimeout>>();
    const clickTimer = useRef<ReturnType<typeof setTimeout>>();

    // ── Helpers ───────────────────────────────────────────────────────────────
    function loadAudio() {
        const audio = audioRef.current;
        if (!audio || audioSourceLoaded.current) return;
        audio.src = "/hero.mp3";
        audio.load();
        audioSourceLoaded.current = true;
    }

    function setSpriteClass(name: string, active: boolean) {
        spriteRef.current?.classList.toggle(name, active);
    }

    // ── Blink loop ────────────────────────────────────────────────────────────

    function scheduleBlink() {
        blinkTimer.current = setTimeout(() => {
            setSpriteClass("is-blinking", true);
            blinkTimer.current = setTimeout(() => {
                setSpriteClass("is-blinking", false);
                scheduleBlink(); // repeat indefinitely
            }, 200);
        }, 1200 + Math.random() * 3600);
    }

    // ── Thinking pose loop ───────────────────────────────────────────────────

    function scheduleThinking() {
        clearTimeout(idleTimer.current);
        clearTimeout(thinkTimer.current);

        // Start waiting for the next thinking pose
        idleTimer.current = setTimeout(() => {
            const audio = audioRef.current;
            const audioPlaying = audio && !audio.paused && !audio.ended;
            
            // Re-check conditions: don't think if hovered or playing audio
            if (isHoveredRef.current || audioPlaying) {
                scheduleThinking(); 
                return;
            }

            setIsThinking(true);
            
            // Stay in thinking pose for 4 seconds
            thinkTimer.current = setTimeout(() => {
                setIsThinking(false);
                // Wait for the next periodic cycle
                scheduleThinking(); 
            }, 4000);
        }, 15000 + Math.random() * 10000); // 15-25s idle delay
    }

    // ── Mount / unmount ───────────────────────────────────────────────────────

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.85;

        scheduleBlink();
        scheduleThinking();

        // Sync subtitle cues → speech bubble while audio plays
        function bindSubtitles() {
            const track = audio?.textTracks[0];
            if (!track) return;
            track.mode = "hidden";
            track.addEventListener("cuechange", () => {
                if (!isHoveredRef.current) return;
                const cue = track.activeCues?.[0] as VTTCue | undefined;
                if (cue) setMessage(cue.text);
            });
        }

        if (audio.readyState >= 1) {
            bindSubtitles();
        } else {
            audio.addEventListener("loadedmetadata", bindSubtitles, { once: true });
        }

        // Any user activity resets the idle timer and clears active pose
        const resetIdle = () => {
            setIsThinking(prev => prev ? false : prev);
            scheduleThinking();
        };
        (["mousemove", "keydown", "touchstart", "scroll"] as const)
            .forEach((e) => window.addEventListener(e, resetIdle, { passive: true }));

        return () => {
            [blinkTimer, idleTimer, thinkTimer, pokeTimer, shakeTimer, clickTimer]
                .forEach((t) => clearTimeout(t.current));
            (["mousemove", "keydown", "touchstart", "scroll"] as const)
                .forEach((e) => window.removeEventListener(e, resetIdle));
            audio.pause();
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Sync muted state → audio element
    useEffect(() => {
        if (audioRef.current) audioRef.current.muted = isMuted;
    }, [isMuted]);

    // ── Poke ──────────────────────────────────────────────────────────────────

    function poke() {
        const dir: 1 | 2 = lastPokeDir.current === 1 ? 2 : 1;
        lastPokeDir.current = dir;
        setActivePoke(dir);
        clearTimeout(pokeTimer.current);
        pokeTimer.current = setTimeout(() => setActivePoke(0), 600);
    }

    // ── Mouse / touch handlers ────────────────────────────────────────────────

    function onMouseEnter() {
        isHoveredRef.current = true;
        setIsHovered(true);
        if (isThinking) setIsThinking(false);

        loadAudio();
        lastClickAt.current = Date.now(); // prevents click firing right after hover on mobile

        const audio = audioRef.current;
        if (audio) {
            if (audio.ended) audio.currentTime = 0;
            if (audio.paused) {
                const cue = audio.textTracks[0]?.activeCues?.[0] as VTTCue | undefined;
                setMessage(cue?.text ?? HOVER_LINES[0]);
                audio.play().catch(() => { });
            }
        } else {
            setMessage(pick(HOVER_LINES));
        }

        setSpriteClass("is-talking", true);
    }

    function onMouseLeave() {
        isHoveredRef.current = false;
        setIsHovered(false);
        setMessage("");
        setSpriteClass("is-talking", false);
        audioRef.current?.pause();
    }

    function onClick() {
        if (Date.now() - lastClickAt.current < 300) return; // ignore immediate post-hover tap

        if (isThinking) {
            setIsThinking(false);
            clearTimeout(thinkTimer.current);
            audioRef.current?.pause();
            setMessage("");
            setSpriteClass("is-talking", false);
            return;
        }

        loadAudio();
        clickCount.current += 1;

        // Auto-reset click streak after 3s of no clicking
        clearTimeout(clickTimer.current);
        clickTimer.current = setTimeout(() => {
            clickCount.current = 0;
            maxPokes.current = Math.floor(Math.random() * 2) + 5;
        }, 3000);

        if (clickCount.current < maxPokes.current) {
            poke();

            if (clickCount.current === 1) {
                // First click: restart audio from the top
                const audio = audioRef.current;
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(() => { });
                    setMessage(HOVER_LINES[0]);
                    setSpriteClass("is-talking", true);
                } else {
                    setMessage(pick(HOVER_LINES));
                }
            } else {
                setMessage(pick(ANGRY_MESSAGES));
            }
        } else {
            // Too many pokes → rage shake
            poke();
            setMessage(pick(ANGRY_MESSAGES));
            setShaking(true);
            clearTimeout(shakeTimer.current);
            shakeTimer.current = setTimeout(() => {
                setShaking(false);
                setActivePoke(0);
                setMessage(isHoveredRef.current ? pick(HOVER_LINES) : "");
            }, 600);
        }
    }

    // ── Render ────────────────────────────────────────────────────────────────

    const isAngry = ANGRY_MESSAGES.includes(message as typeof ANGRY_MESSAGES[number]);

    const spriteWrapClass = [
        "sprite-wrap w-full h-full",
        isThinking && "is-thinking",
        activePoke > 0 && `is-poking-${activePoke}`,
    ].filter(Boolean).join(" ");

    return (
        <div className="relative flex items-center w-fit">

            {/* ── Avatar ── */}
            <m.div
                className="relative bg-theme/80 size-[280px] md:size-[380px] lg:size-[450px] aspect-square rounded-full overflow-hidden animate-profile cursor-pointer shrink-0"
                suppressHydrationWarning
                variants={shaking ? SHAKE_VARIANTS : undefined}
                initial={shaking ? "idle" : false}
                animate={shaking ? "shake" : undefined}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={onClick}
            >
                {/* Sprite layers — visibility controlled via sprite.css */}
                <div ref={spriteRef} className={spriteWrapClass}>
                    <Image priority unoptimized src="/hero/1.webp" alt="Anuj Joshi" width={500} height={500}
                        className="sprite-base object-cover"
                        sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 450px" />

                    {/* eslint-disable @next/next/no-img-element */}
                    <img src="/hero/open.webp" alt="" aria-hidden decoding="async" fetchPriority="low" loading="lazy" className="sprite-talk  sprite-frame object-cover" />
                    <img src="/hero/2.webp" alt="" aria-hidden decoding="async" fetchPriority="low" loading="lazy" className="sprite-blink sprite-frame object-cover" />
                    <img src="/hero/thinking.webp" alt="" aria-hidden decoding="async" fetchPriority="low" loading="lazy" className="sprite-think sprite-frame object-cover" />
                    <img src="/talk/poke1.webp" alt="" aria-hidden decoding="async" fetchPriority="low" loading="lazy" className="sprite-poke sprite-poke1 sprite-frame object-cover" />
                    <img src="/talk/poke2.webp" alt="" aria-hidden decoding="async" fetchPriority="low" loading="lazy" className="sprite-poke sprite-poke2 sprite-frame object-cover" />
                    {/* eslint-enable @next/next/no-img-element */}
                </div>

                {/* ── Audio Controls ── */}
                <AnimatePresence>
                    {isHovered && !isThinking && (
                        <m.div
                            key="audio-controls"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[85%] max-w-[220px] flex items-center gap-3 px-4 py-2 rounded-full bg-muted/90 backdrop-blur-md z-30 shadow-lg border border-border/10"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsMuted((v) => !v); }}
                                title={isMuted ? "Unmute" : "Mute"}
                                className="flex items-center justify-center p-0.5 transition-colors cursor-pointer select-none text-muted-foreground hover:text-foreground"
                            >
                                {isMuted ? <VolumeXIcon className="w-4 h-4" /> : <Volume2Icon className="w-4 h-4" />}
                            </button>

                            <input
                                ref={progressRef}
                                type="range" min={0} step={0.01} defaultValue={0}
                                onPointerDown={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    const audio = audioRef.current;
                                    if (!audio) return;
                                    audio.currentTime = parseFloat(e.target.value);
                                    const cue = audio.textTracks[0]?.activeCues?.[0] as VTTCue | undefined;
                                    setMessage(cue?.text ?? HOVER_LINES[0]);
                                }}
                                className="flex-1 h-1.5 bg-foreground/10 rounded-full appearance-none cursor-pointer outline-none accent-foreground
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                                    [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                            />
                        </m.div>
                    )}
                </AnimatePresence>
            </m.div>

            {/* ── Hover Badge ── */}
            <AnimatePresence>
                {!isHovered && !isThinking && !shaking && !message && (
                    <m.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute z-20 pointer-events-none bottom-[5%] right-[2%] md:-right-4 md:bottom-[15%]"
                    >
                        <div className="relative flex items-center gap-2 bg-background/90 backdrop-blur-md text-foreground px-4 py-2 rounded-full shadow-2xl border border-border/50">
                            <div className="absolute inset-0 rounded-full border-[2px] border-theme/50 opacity-20" />
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-theme" />
                            </div>
                            <span className="relative z-10 text-xs font-medium tracking-wide whitespace-nowrap">
                                <span className="hidden sm:inline">Hover here</span>
                                <span className="sm:hidden">Tap here</span>
                            </span>
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* ── Speech Bubble ── */}
            <AnimatePresence mode="wait">
                {message && !isThinking && (
                    <m.div
                        key={message}
                        initial={{ opacity: 0, scale: 0.88, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-[50%] translate-x-1/2 md:translate-x-0 bottom-0 md:right-[70%] md:top-[72%] md:-translate-y-1/2 translate-y-10 z-20 pointer-events-none"
                    >
                        <div className={`relative backdrop-blur-sm font-semibold px-4 py-2 rounded-xl shadow-lg whitespace-pre-line text-sm w-max max-w-[280px] text-center transition-colors duration-300 ${isAngry ? "text-destructive-foreground bg-destructive" : "text-muted-foreground bg-muted"}`}>
                            <span className={`absolute md:opacity-100 opacity-0 right-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-b-[7px] border-l-[9px] border-t-transparent border-b-transparent transition-colors duration-300 ${isAngry ? "border-l-destructive" : "border-l-muted"}`} />
                            {message}
                        </div>
                    </m.div>
                )}
            </AnimatePresence>

            {/* ── Audio ── */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio
                ref={audioRef}
                preload="none"
                className="hidden"
                muted={isMuted}
                onTimeUpdate={(e) => {
                    const el = progressRef.current;
                    if (!el) return;
                    const { currentTime, duration } = e.currentTarget;
                    el.value = String(currentTime);
                    if (duration && !isNaN(duration)) el.max = String(duration);
                }}
                onEnded={() => setSpriteClass("is-talking", false)}
            >
                <track kind="subtitles" src="/hero.vtt" srcLang="en" label="English" default />
            </audio>
        </div>
    );
}