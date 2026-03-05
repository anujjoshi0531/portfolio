"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { containerVariants } from "@/lib/animate";
import { Volume2Icon, VolumeXIcon } from "lucide-react";

const DEFAULT_MESSAGE = "";

const HOVER_LINES = [
    "Hey there! I'm Anuj Joshi 👋",
    "A software dev who loves building fast interfaces.",
    "I focus on modern and interactive web experiences.",
    "Feel free to explore my portfolio.",
    "Check out the projects I've built.",
    "See the technologies I work with.",
    "If something catches your interest...",
    "...I'd love to hear from you!",
    "Want to collaborate or ask a question?",
    "Just say hello — feel free to reach out.",
    "Thanks for visiting and enjoy exploring!",
];

const ANGRY_MESSAGES = [
    "Ouch! Are you angry?",
    "Hey, that tickles!",
    "Stop poking me!",
    "I'm not a stress ball!",
    "Was that necessary?",
    "Help! I'm being attacked!",
    "Okay okay, I give up!",
    "You click like you mean it!",
];

const SHAKE_VARIANTS = {
    idle: { x: 0, rotate: 0 },
    shake: {
        x: [0, -10, 12, -10, 8, -6, 4, 0],
        rotate: [0, -4, 4, -3, 3, -2, 1, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
    },
};

function setTalking(el: HTMLElement | null, active: boolean) {
    if (!el) return;
    if (active) {
        el.classList.add("is-talking");
    } else {
        el.classList.remove("is-talking");
    }
}

export default function HeroImage() {
    const [isHovered, setIsHovered] = useState(false);
    const [message, setMessage] = useState(DEFAULT_MESSAGE);
    const [shaking, setShaking] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [isYawning, setIsYawning] = useState(false);
    const [activePoke, setActivePoke] = useState<number>(0);

    const spriteRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const progressRef = useRef<HTMLInputElement | null>(null);
    const clickCountRef = useRef(0);
    const maxPokesRef = useRef<number>(Math.floor(Math.random() * 2) + 5);
    const pokeTypeRef = useRef<number | null>(null);
    const stateRef = useRef({ isHovered: false });

    const blinkTimerRef = useRef<NodeJS.Timeout | null>(null);
    const clickTimerRef = useRef<NodeJS.Timeout | null>(null);
    const shakeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const yawnEndTimerRef = useRef<NodeJS.Timeout | null>(null);
    const pokeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const triggerBlinkRef = useRef<(() => void) | null>(null);
    const startBlinkRef = useRef<(() => void) | null>(null);

    // Define once into the refs (no deps, no re-creation on render)
    if (!triggerBlinkRef.current) {
        triggerBlinkRef.current = () => {
            const el = spriteRef.current;
            if (!el) return;
            el.classList.add("is-blinking");
            blinkTimerRef.current = setTimeout(() => {
                el.classList.remove("is-blinking");
                if (triggerBlinkRef.current) {
                    blinkTimerRef.current = setTimeout(triggerBlinkRef.current, 2000 + Math.random() * 4000);
                }
            }, 200);
        };
        startBlinkRef.current = () => {
            if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
            if (triggerBlinkRef.current) {
                blinkTimerRef.current = setTimeout(triggerBlinkRef.current, 600 + Math.random() * 800);
            }
        };
    }

    useEffect(() => {
        if (startBlinkRef.current) startBlinkRef.current();
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = 0.85;

        const setupTrack = () => {
            const track = audio.textTracks[0];
            if (!track) return;
            track.mode = "hidden";

            const onCueChange = () => {
                if (!stateRef.current.isHovered) return;
                const cue = track.activeCues?.[0] as VTTCue | undefined;
                if (cue) setMessage(cue.text);
            };

            track.addEventListener("cuechange", onCueChange);
            return () => track.removeEventListener("cuechange", onCueChange);
        };

        let cleanup = audio.readyState >= 1 ? setupTrack() : undefined;
        if (!cleanup) {
            audio.addEventListener("loadedmetadata", () => { cleanup = setupTrack(); }, { once: true });
        }

        const resetIdle = () => {
            setIsYawning(false);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            if (yawnEndTimerRef.current) clearTimeout(yawnEndTimerRef.current);
            idleTimerRef.current = setTimeout(() => {
                const audio = audioRef.current;
                const isPlaying = audio && !audio.paused && !audio.ended;

                if (!stateRef.current.isHovered && !isPlaying) {
                    setIsYawning(true);
                    // Keep yawn for 2 seconds then hide it
                    yawnEndTimerRef.current = setTimeout(() => {
                        setIsYawning(false);
                    }, 1500);
                }
            }, 6000);
        };

        window.addEventListener("mousemove", resetIdle);
        window.addEventListener("keydown", resetIdle);
        window.addEventListener("touchstart", resetIdle);
        window.addEventListener("scroll", resetIdle);

        resetIdle();

        return () => {
            if (blinkTimerRef.current) clearTimeout(blinkTimerRef.current);
            if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
            if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            if (yawnEndTimerRef.current) clearTimeout(yawnEndTimerRef.current);
            window.removeEventListener("mousemove", resetIdle);
            window.removeEventListener("keydown", resetIdle);
            window.removeEventListener("touchstart", resetIdle);
            window.removeEventListener("scroll", resetIdle);
            audio.pause();
            cleanup?.();
        };
    }, []);

    const triggerPoke = () => {
        let nextPoke = 1;
        if (pokeTypeRef.current === null) {
            nextPoke = Math.random() > 0.5 ? 1 : 2;
        } else {
            nextPoke = pokeTypeRef.current === 1 ? 2 : 1;
        }
        pokeTypeRef.current = nextPoke;
        setActivePoke(nextPoke);

        if (pokeTimerRef.current) clearTimeout(pokeTimerRef.current);
        pokeTimerRef.current = setTimeout(() => setActivePoke(0), 600);
    };

    const handleMouseEnter = () => {
        stateRef.current.isHovered = true;
        setIsHovered(true);
        if (audioRef.current) {
            const audio = audioRef.current;
            if (audio.ended) audio.currentTime = 0;
            if (audio.paused) {
                const cue = audio.textTracks[0]?.activeCues?.[0] as VTTCue | undefined;
                setMessage(cue ? cue.text : HOVER_LINES[0]);
                audio.play().catch(() => { });
            }
        } else {
            setMessage(HOVER_LINES[Math.floor(Math.random() * HOVER_LINES.length)]);
        }

        setTalking(spriteRef.current, true);
    };

    const handleMouseLeave = () => {
        stateRef.current.isHovered = false;
        setIsHovered(false);
        setMessage(DEFAULT_MESSAGE);
        setTalking(spriteRef.current, false);
        if (audioRef.current) audioRef.current.pause();
    };

    const handleClick = () => {
        if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
        clickTimerRef.current = setTimeout(() => {
            clickCountRef.current = 0;
            maxPokesRef.current = Math.floor(Math.random() * 2) + 5;
        }, 3000);
        clickCountRef.current += 1;

        if (clickCountRef.current < maxPokesRef.current) {
            triggerPoke();
            if (clickCountRef.current === 1) {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play().catch(() => { });
                    setMessage(HOVER_LINES[0]);
                    setTalking(spriteRef.current, true);
                } else {
                    setMessage(HOVER_LINES[Math.floor(Math.random() * HOVER_LINES.length)]);
                }
            } else {
                setMessage(ANGRY_MESSAGES[Math.floor(Math.random() * ANGRY_MESSAGES.length)]);
            }
        } else {
            const finalPoke = Math.random() > 0.5 ? 1 : 2;
            setActivePoke(finalPoke);
            if (pokeTimerRef.current) clearTimeout(pokeTimerRef.current);

            setMessage(ANGRY_MESSAGES[Math.floor(Math.random() * ANGRY_MESSAGES.length)]);
            setShaking(true);

            if (shakeTimerRef.current) clearTimeout(shakeTimerRef.current);
            shakeTimerRef.current = setTimeout(() => {
                setShaking(false);
                setActivePoke(0);
                setMessage(stateRef.current.isHovered
                    ? HOVER_LINES[Math.floor(Math.random() * HOVER_LINES.length)]
                    : DEFAULT_MESSAGE);
            }, 600);
        }
    };

    const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
        if (progressRef.current) {
            progressRef.current.value = String(e.currentTarget.currentTime);
            const dur = e.currentTarget.duration;
            if (dur && !isNaN(dur)) progressRef.current.max = String(dur);
        }
    };

    return (
        <div className="relative flex items-center w-fit">
            {/* ── Avatar ── */}
            <motion.div
                className="relative bg-theme/80 lg:max-w-[60vw] w-fit min-w-[150px] min-h-[150px] max-h-[80vh] object-cover rounded-full overflow-hidden animate-profile cursor-pointer"
                variants={shaking ? SHAKE_VARIANTS : containerVariants}
                initial={shaking ? "idle" : "hidden"}
                animate={shaking ? "shake" : "visible"}
                whileInView={shaking ? undefined : "visible"}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
            >
                {/*
                 * Sprite stack — managed by sprite.css:
                 *   1. sprite-base  — always visible
                 *   2. sprite-talk  — mouth-open
                 *   3. sprite-blink — blink overlay
                 *   4. sprite-yawn  — yawn overlay
                 *   5. sprite-poke  — poke overlays
                 */}
                <div ref={spriteRef} className={`sprite-wrap w-full h-full ${isYawning ? "is-yawning" : ""} ${activePoke > 0 ? "is-poking-" + activePoke : ""}`}>
                    {/* Layer 1 – base (Next.js Image for SEO + priority loading) */}
                    <Image
                        priority
                        src="/hero/1.png"
                        alt="Anuj Joshi"
                        width={500}
                        height={500}
                        className="sprite-base object-cover"
                        sizes="(max-width:768px) 360px, (max-width:1024px) 360px, 500px"
                    />
                    {/* Layer 2 – mouth open (talk): plain img — no Next.js wrapper overhead */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/hero/open.png"
                        alt=""
                        aria-hidden
                        decoding="async"
                        fetchPriority="low"
                        className="sprite-talk sprite-frame object-cover"
                    />
                    {/* Layer 3 – blink (eyes half-closed): same, plain img */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/hero/2.png"
                        alt=""
                        aria-hidden
                        decoding="async"
                        fetchPriority="low"
                        className="sprite-blink sprite-frame object-cover"
                    />
                    {/* Layer 4 – yawn overlay: highest z */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/hero/yawn.png"
                        alt=""
                        aria-hidden
                        decoding="async"
                        fetchPriority="low"
                        className="sprite-yawn sprite-frame object-cover"
                    />
                    {/* Layer 5 – poke overlays: highest z */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/talk/poke1.png"
                        alt=""
                        aria-hidden
                        decoding="async"
                        fetchPriority="low"
                        className="sprite-poke sprite-poke1 sprite-frame object-cover"
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/talk/poke2.png"
                        alt=""
                        aria-hidden
                        decoding="async"
                        fetchPriority="low"
                        className="sprite-poke sprite-poke2 sprite-frame object-cover"
                    />
                </div>

                {/* Audio Controls */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            key="audio-controls"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            onClick={(e) => e.stopPropagation()}
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[85%] max-w-[220px] flex items-center gap-3 px-4 py-2 rounded-full bg-muted/90 backdrop-blur-md z-30 shadow-lg border border-border/10"
                        >
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsMuted((prev) => !prev);
                                    if (audioRef.current) audioRef.current.muted = !isMuted;
                                }}
                                title={isMuted ? "Unmute" : "Mute"}
                                className="flex items-center justify-center p-0.5 transition-colors cursor-pointer select-none text-muted-foreground hover:text-foreground"
                            >
                                {isMuted ? <VolumeXIcon className="w-4 h-4" /> : <Volume2Icon className="w-4 h-4" />}
                            </button>

                            <input
                                ref={(node) => {
                                    if (node) {
                                        progressRef.current = node;
                                        if (audioRef.current) {
                                            node.value = String(audioRef.current.currentTime);
                                            const dur = audioRef.current.duration;
                                            if (dur && !isNaN(dur)) node.max = String(dur);
                                        }
                                    } else {
                                        progressRef.current = null;
                                    }
                                }}
                                type="range"
                                min={0}
                                step={0.01}
                                defaultValue={0}
                                onPointerDown={(e) => e.stopPropagation()}
                                onChange={(e) => {
                                    const time = parseFloat(e.target.value);
                                    if (audioRef.current) {
                                        audioRef.current.currentTime = time;
                                        const cue = audioRef.current.textTracks[0]?.activeCues?.[0] as VTTCue | undefined;
                                        setMessage(cue ? cue.text : HOVER_LINES[0]);
                                    }
                                }}
                                className="flex-1 h-1.5 bg-foreground/10 rounded-full appearance-none cursor-pointer outline-none accent-foreground
                                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:bg-foreground [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110
                                    [&::-moz-range-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:bg-foreground [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:transition-transform [&::-moz-range-thumb]:hover:scale-110"
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Action Indicator (Premium Badge) */}
            <AnimatePresence>
                {!isHovered && !isYawning && !shaking && !message && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="absolute z-20 pointer-events-none bottom-[5%] right-[2%] md:-right-4 md:bottom-[15%]"
                    >
                        <div className="relative flex items-center gap-2 bg-background/90 backdrop-blur-md text-foreground px-4 py-2 rounded-full shadow-2xl border border-border/50 group">
                            {/* Glowing Ring Effect on the badge */}
                            <div className="absolute inset-0 rounded-full border-[2px] border-theme/50 opacity-20" style={{ animationDuration: '3s' }} />

                            {/* Inner Dot */}
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-theme opacity-75" />
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-theme" />
                            </div>

                            <span className="relative z-10 text-xs font-medium tracking-wide whitespace-nowrap">Hover here</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Speech Bubble */}
            <AnimatePresence mode="wait">
                {message && !isYawning && (
                    <motion.div
                        key={message}
                        initial={{ opacity: 0, scale: 0.88, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.88, y: 4 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-[50%] translate-x-1/2 md:translate-x-0 bottom-0 md:right-[70%] md:top-[72%] md:-translate-y-1/2 translate-y-10 z-20 pointer-events-none"
                    >
                        {(() => {
                            const isAngry = ANGRY_MESSAGES.includes(message);
                            return (
                                <div className={`relative backdrop-blur-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 shadow-lg whitespace-pre-line text-sm w-max max-w-[280px] text-center ${isAngry ? "text-destructive-foreground bg-destructive" : "text-muted-foreground bg-muted"}`}>
                                    {/* Bubble Tail */}
                                    <span className={`absolute md:opacity-100 opacity-0 right-[-7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[7px] border-b-[7px] border-l-[9px] border-t-transparent border-b-transparent transition-all duration-300 ${isAngry ? "border-l-destructive" : "border-l-muted"}`} />
                                    {message}
                                </div>
                            );
                        })()}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Audio */}
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio
                ref={audioRef}
                preload="auto"
                className="hidden"
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => {
                    setTalking(spriteRef.current, false);
                }}
            >
                <source src="/hero.mp3" type="audio/mpeg" />
                <track kind="subtitles" src="/hero.vtt" srcLang="en" label="English" default />
            </audio>
        </div>
    );
}