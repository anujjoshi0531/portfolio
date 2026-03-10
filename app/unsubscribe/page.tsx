"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, MailQuestion, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "initial">("initial");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!id) {
      setStatus("error");
      setMessage("Invalid unsubscribe link. Missing subscriber ID.");
    }
  }, [id]);

  const handleUnsubscribe = async () => {
    if (!id) return;
    
    setStatus("loading");
    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to unsubscribe.");
      }

      setStatus("success");
      setMessage("You have been successfully unsubscribed.");
      toast.success("Unsubscribed successfully");
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl flex flex-col items-center text-center">
      {status === "initial" && (
        <>
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
            <MailQuestion className="w-8 h-8 text-amber-500" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">We're sad to see you go!</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">
            Are you sure you want to unsubscribe from the newsletter? You'll miss out on future updates.
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={() => router.push("/")}
              className="flex-1 py-3 px-4 rounded-xl font-medium border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUnsubscribe}
              className="flex-1 py-3 px-4 rounded-xl font-medium bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              Unsubscribe
            </button>
          </div>
        </>
      )}

      {status === "loading" && (
        <div className="py-12 flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
          <p className="text-zinc-500 dark:text-zinc-400 animate-pulse">Processing your request...</p>
        </div>
      )}

      {status === "success" && (
        <div className="py-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Unsubscribed</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">{message}</p>
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl font-medium bg-indigo-500 hover:bg-indigo-600 text-white transition-colors block text-center"
          >
            Return to Homepage
          </Link>
        </div>
      )}

      {status === "error" && (
        <div className="py-6 flex flex-col items-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Error</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mb-8">{message}</p>
          <Link
            href="/"
            className="w-full py-3 px-4 rounded-xl font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity block text-center"
          >
            Return to Homepage
          </Link>
        </div>
      )}
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="animate-pulse"><Loader2 className="w-10 h-10 animate-spin text-indigo-500" /></div>}>
        <UnsubscribeContent />
      </Suspense>
    </div>
  );
}
