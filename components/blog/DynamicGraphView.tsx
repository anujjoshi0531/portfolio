"use client";

import dynamic from "next/dynamic";
import type { GraphData } from "@/lib/server/local-content";

const GraphViewInner = dynamic(
  () => import("./GraphView").then((mod) => mod.GraphView),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full rounded-xl border border-neutral-800 bg-neutral-900/40 animate-pulse flex items-center justify-center text-xs text-neutral-500">
        Loading knowledge graph...
      </div>
    ),
  }
);

interface DynamicGraphViewProps {
  data: GraphData;
  currentSlug?: string;
  className?: string;
  title?: string;
}

export function DynamicGraphView(props: DynamicGraphViewProps) {
  return <GraphViewInner {...props} />;
}
