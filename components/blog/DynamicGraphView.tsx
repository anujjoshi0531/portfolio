"use client";

import React, { Component, ReactNode } from "react";
import dynamic from "next/dynamic";
import type { GraphData } from "@/features/blog/lib/graph";

const GraphViewInner = dynamic(
  () => import("./GraphView"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[280px] w-full rounded-xl border border-neutral-800 bg-neutral-900/40 animate-pulse flex items-center justify-center text-xs text-neutral-500">
        Loading knowledge graph...
      </div>
    ),
  }
);

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GraphErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Knowledge Graph Rendering Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-[280px] w-full rounded-xl border border-neutral-800 bg-neutral-900/40 p-4 flex items-center justify-center text-xs text-neutral-500">
          Knowledge graph unavailable
        </div>
      );
    }
    return this.props.children;
  }
}

interface DynamicGraphViewProps {
  data: GraphData;
  currentSlug?: string;
  className?: string;
  title?: string;
}

export function DynamicGraphView(props: DynamicGraphViewProps) {
  return (
    <GraphErrorBoundary>
      <GraphViewInner {...props} />
    </GraphErrorBoundary>
  );
}
