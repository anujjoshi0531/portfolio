export default function QuoteSection() {
  return (
    <div className="relative max-w-3xl mx-auto aspect-video flex items-center justify-center">
      <span className="animate-quote dark:bg-theme/30 bg-theme/15 -z-10 blur-2xl rounded-full dark:blur-[150px] w-80 h-80 absolute" />
      <div className="text-center space-y-8">
        <div className="space-y-4">
        <p className="text-2xl sm:text-3xl md:text-4xl text-balance backdrop-blur-sm">
          You don&apos;t learn to walk by <span className="text-theme font-semibold">following rules</span>
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl text-balance backdrop-blur-sm">
          You learn by <span className="text-theme font-semibold">doing and following over</span>
        </p>
        </div>
        <p className="text-sm sm:text-base md:text-lg italic text-balance backdrop-blur-sm">
          ~ Richard Branson
        </p>
      </div>
    </div>
  );
}
