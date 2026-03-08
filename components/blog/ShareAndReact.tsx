"use client";

import { useState, useEffect } from "react";

import { FaTwitter, FaLinkedin, FaLink, FaPaperPlane, FaMessage } from "react-icons/fa6";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";

interface ShareAndReactProps {
    title: string;
}

export default function ShareAndReact({ title }: ShareAndReactProps) {
    const [isMounted, setIsMounted] = useState(false);

    // Feedback Form State
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const suggestions = [
        "Great article! Really enjoyed reading this.",
        "I found a typo/error that you might want to fix.",
        "Could you write more about this specific topic?"
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleShare = async (platform: string) => {
        const url = window.location.href;
        const text = `Check out "${title}" by Anuj Joshi\n\n`;

        if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, "_blank");
        } else if (platform === "linkedin") {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, "_blank");
        } else if (platform === "copy") {
            try {
                await navigator.clipboard.writeText(url);
                toast.success("Link copied to clipboard!");
            } catch (err) {
                toast.error("Failed to copy link");
            }
        }
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message) {
            toast.error("Please enter a message!");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: name || "Anonymous Reader",
                    email: email || "[EMAIL_ADDRESS]", // Fallback to pass zod validation
                    message: `[Blog Feedback: ${title}]\n\n${message}`
                }),
            });

            if (res.ok) {
                toast.success("Message sent successfully! Thank you 🙌");
                setIsOpen(false);
                setMessage("");
                setName("");
                setEmail("");
            } else {
                const err = await res.json();
                toast.error(err?.error || "Failed to send message.");
            }
        } catch (error) {
            toast.error("Network error. Try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isMounted) return null;

    return (
        <div className="fixed z-40 flex flex-row gap-2 xl:gap-4 bottom-6 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-md border rounded-full p-2 shadow-lg items-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <button
                        className="p-3 rounded-full transition-colors text-muted-foreground hover:bg-theme/10 hover:text-theme relative"
                        aria-label="Send Feedback"
                    >
                        <FaMessage size={20} />
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle />
                        <DialogDescription>
                            Have a suggestion or just want to say thanks? I&apos;d love to hear from you directly!
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleFeedbackSubmit} className="space-y-4 py-2">

                        <div className="grid grid-cols-2 gap-3">
                            <Input
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Textarea
                            placeholder="Write your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="min-h-[100px] resize-none"
                            required
                        />{/* Quick Suggestions */}
                        <div className="flex flex-wrap gap-1">
                            {suggestions.map((sug, i) => (
                                <Badge
                                    key={i}
                                    onClick={() => setMessage(sug)}
                                    className="text-ellipsis truncate !normal-case"
                                >
                                    {sug}
                                </Badge>
                            ))}
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting || !message}
                            size="md"
                            className="w-full gap-2 font-semibold"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                            {!isSubmitting && <FaPaperPlane size={14} />}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Share Buttons */}
            <button
                onClick={() => handleShare("twitter")}
                className="p-3 text-muted-foreground hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/10 rounded-full transition-colors"
                aria-label="Share on Twitter"
            >
                <FaTwitter size={20} />
            </button>

            <button
                onClick={() => handleShare("linkedin")}
                className="p-3 text-muted-foreground hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 rounded-full transition-colors"
                aria-label="Share on LinkedIn"
            >
                <FaLinkedin size={20} />
            </button>

            <button
                onClick={() => handleShare("copy")}
                className="p-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
                aria-label="Copy link"
            >
                <FaLink size={20} />
            </button>
        </div>
    );
}
