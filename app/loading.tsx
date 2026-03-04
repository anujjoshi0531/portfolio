import Logo from "@/components/site/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background select-none overflow-hidden">
      {/* Floating avatar */}
      <div className="animate-[avatar-float_3s_ease-in-out_infinite]">
        <Logo className="size-32 rounded-full border-2 border-primary bg-theme/80" />
      </div>

      {/* Loading text + bar */}
      <div className="mt-8 flex flex-col items-center gap-3">
        <p className="text-sm font-semibold tracking-widest uppercase text-muted-foreground">
          Loading
        </p>

        <div className="relative w-40 h-[3px] rounded-full overflow-hidden bg-muted">
          <div className="absolute inset-y-0 left-0 w-1/2 rounded-full animate-[loading-bar_2s_ease-in-out_infinite] bg-theme" />
        </div>
      </div>
    </div>
  );
}