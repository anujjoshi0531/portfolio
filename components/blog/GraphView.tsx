"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Maximize2, Minimize2, Network, Search, RotateCcw, ExternalLink } from "lucide-react";
import type { GraphData } from "@/features/blog/lib/graph";

interface GraphViewProps {
  data?: GraphData;
  currentSlug?: string;
  className?: string;
  title?: string;
}

interface NodeSim {
  id: string;
  title: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isCurrent: boolean;
  neighbors: Set<string>;
  category?: string;
  tags: string[];
}

export function GraphView({ data, currentSlug, className = "", title = "Graph View" }: GraphViewProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mode, setMode] = useState<"local" | "global">(currentSlug ? "local" : "global");
  const [localDepth, setLocalDepth] = useState<1 | 2>(2);
  const [query, setQuery] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(currentSlug ?? null);
  const hoveredNodeIdRef = useRef<string | null>(null);

  const nodeById = useMemo(() => new Map((data?.nodes ?? []).map((node) => [node.id, node])), [data]);

  // Filter nodes/links safely based on mode
  const filteredData = useMemo(() => {
    const safeNodes = Array.isArray(data?.nodes) ? data.nodes : [];
    const safeLinks = Array.isArray(data?.links) ? data.links : [];

    if (mode === "local" && currentSlug) {
      const neighborSlugs = new Set<string>([currentSlug]);
      let frontier = new Set([currentSlug]);
      for (let depth = 0; depth < localDepth; depth++) {
        const next = new Set<string>();
        safeLinks.forEach((l) => {
          if (frontier.has(l?.source) && l?.target) next.add(l.target);
          if (frontier.has(l?.target) && l?.source) next.add(l.source);
        });
        next.forEach((id) => neighborSlugs.add(id));
        frontier = next;
      }

      const nodes = safeNodes.filter((n) => n?.id && neighborSlugs.has(n.id));
      const links = safeLinks.filter(
        (l) => l?.source && l?.target && neighborSlugs.has(l.source) && neighborSlugs.has(l.target)
      );
      return { nodes, links };
    }
    return { nodes: safeNodes, links: safeLinks };
  }, [data, currentSlug, mode, localDepth]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas needs a resolved color; CSS variables cannot be used directly in its paint styles.
    let themeColor = getComputedStyle(canvas).color;
    let isDark = document.documentElement.classList.contains("dark");
    const themeObserver = new MutationObserver(() => {
      themeColor = getComputedStyle(canvas).color;
      isDark = document.documentElement.classList.contains("dark");
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    let width = (canvas.width = containerRef.current?.clientWidth || 320);
    let height = (canvas.height = isFullscreen ? Math.max(300, window.innerHeight - 100) : 280);

    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      width = canvas.width = Math.max(200, containerRef.current.clientWidth);
      height = canvas.height = isFullscreen ? Math.max(300, window.innerHeight - 100) : 280;
    };

    window.addEventListener("resize", handleResize);

    // Initialize physics nodes
    const nodeMap = new Map<string, NodeSim>();
    const nodeCount = filteredData.nodes.length;
    const center = { x: width / 2, y: height / 2 };

    filteredData.nodes.forEach((n, idx) => {
      if (!n || !n.id) return;
      const angle = (idx / (nodeCount || 1)) * 2 * Math.PI;
      const radiusOffset = 60 + Math.random() * 50;
      const displayTitle = typeof n.title === "string" && n.title ? n.title : n.id || "Untitled";

      nodeMap.set(n.id, {
        id: n.id,
        title: displayTitle,
        x: center.x + Math.cos(angle) * radiusOffset,
        y: center.y + Math.sin(angle) * radiusOffset,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: n.id === currentSlug ? 7 : 5,
        isCurrent: n.id === currentSlug,
        neighbors: new Set<string>(),
        category: n.category,
        tags: n.tags ?? [],
      });
    });

    filteredData.links.forEach((l) => {
      if (!l?.source || !l?.target) return;
      const sourceNode = nodeMap.get(l.source);
      const targetNode = nodeMap.get(l.target);
      if (sourceNode && targetNode) {
        sourceNode.neighbors.add(l.target);
        targetNode.neighbors.add(l.source);
      }
    });

    const nodesArray = Array.from(nodeMap.values());
    let animationFrameId: number;

    // 2D Physics Step & Rendering
    const simulate = () => {
      ctx.clearRect(0, 0, width, height);

      // Repulsion
      for (let i = 0; i < nodesArray.length; i++) {
        for (let j = i + 1; j < nodesArray.length; j++) {
          const n1 = nodesArray[i];
          const n2 = nodesArray[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);

          if (dist < 180) {
            const force = ((180 - dist) / dist) * 0.05;
            const fx = dx * force;
            const fy = dy * force;
            n1.vx -= fx;
            n1.vy -= fy;
            n2.vx += fx;
            n2.vy += fy;
          }
        }
      }

      // Link attraction
      filteredData.links.forEach((l) => {
        if (!l?.source || !l?.target) return;
        const n1 = nodeMap.get(l.source);
        const n2 = nodeMap.get(l.target);
        if (n1 && n2) {
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          const targetDist = 70;
          const force = (dist - targetDist) * 0.008;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          n1.vx += fx;
          n1.vy += fy;
          n2.vx -= fx;
          n2.vy -= fy;
        }
      });

      // Gravity towards center & velocity damping
      nodesArray.forEach((n) => {
        n.vx += (center.x - n.x) * 0.002;
        n.vy += (center.y - n.y) * 0.002;

        n.vx *= 0.88;
        n.vy *= 0.88;

        n.x += n.vx;
        n.y += n.vy;

        // Keep within padding
        const pad = 20;
        n.x = Math.max(pad, Math.min(width - pad, n.x));
        n.y = Math.max(pad, Math.min(height - pad, n.y));
      });

      const currentHoveredId = hoveredNodeIdRef.current;

      // Render Edges
      ctx.lineWidth = 1;
      filteredData.links.forEach((l) => {
        if (!l?.source || !l?.target) return;
        const n1 = nodeMap.get(l.source);
        const n2 = nodeMap.get(l.target);
        if (n1 && n2) {
          const isHighlighted =
            currentHoveredId && (l.source === currentHoveredId || l.target === currentHoveredId);
          ctx.strokeStyle = isHighlighted
            ? themeColor
            : currentHoveredId
            ? (isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.08)")
            : (isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(15, 23, 42, 0.22)");
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.globalAlpha = isHighlighted ? 0.8 : 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      // Render Nodes
      nodesArray.forEach((n) => {
        const isHovered = currentHoveredId === n.id;
        const isNeighbor = currentHoveredId ? n.neighbors.has(currentHoveredId) : false;
        const active = n.isCurrent || selectedNodeId === n.id;
        const matchesQuery = query.trim().length > 1 && n.title.toLowerCase().includes(query.trim().toLowerCase());

        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? n.radius + 3 : n.radius, 0, 2 * Math.PI);

        if (matchesQuery) {
          ctx.fillStyle = "#f59e0b";
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 12;
        } else if (active) {
          ctx.fillStyle = themeColor;
          ctx.shadowColor = themeColor;
          ctx.shadowBlur = 10;
        } else if (isHovered || isNeighbor) {
          ctx.fillStyle = themeColor;
          ctx.shadowColor = themeColor;
          ctx.shadowBlur = 8;
        } else if (currentHoveredId) {
          ctx.fillStyle = "rgba(156, 163, 175, 0.2)";
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = isDark ? "#9ca3af" : "#64748b";
          ctx.shadowBlur = 0;
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Render Labels for active, hovered, or neighbors
        if (active || isHovered || isNeighbor || nodesArray.length <= 15) {
          const safeTitle = typeof n.title === "string" ? n.title : String(n.title || "");
          ctx.font = active || isHovered ? "600 12px Inter, sans-serif" : "400 11px Inter, sans-serif";
          ctx.fillStyle = isDark
            ? (active || isHovered ? "#f3f4f6" : "rgba(209, 213, 219, 0.75)")
            : (active || isHovered ? "#111827" : "#475569");
          ctx.textAlign = "center";
          ctx.fillText(
            safeTitle.length > 22 ? safeTitle.slice(0, 20) + "…" : safeTitle,
            n.x,
            n.y + n.radius + 14
          );
        }
      });

      animationFrameId = requestAnimationFrame(simulate);
    };

    simulate();

    // Mouse Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let foundId: string | null = null;
      for (const n of nodesArray) {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        if (dx * dx + dy * dy <= (n.radius + 6) ** 2) {
          foundId = n.id;
          break;
        }
      }

      hoveredNodeIdRef.current = foundId;
      canvas.style.cursor = foundId ? "pointer" : "default";
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      for (const n of nodesArray) {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        if (dx * dx + dy * dy <= (n.radius + 6) ** 2) {
          setSelectedNodeId(n.id);
          break;
        }
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [filteredData, currentSlug, isFullscreen, router, query, selectedNodeId]);

  const selectedNode = selectedNodeId ? nodeById.get(selectedNodeId) : undefined;
  const selectedConnections = selectedNodeId
    ? filteredData.links.filter((link) => link.source === selectedNodeId || link.target === selectedNodeId).length
    : 0;

  return (
    <div
      ref={containerRef}
      className={`relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 p-4 backdrop-blur-md transition-all ${
        isFullscreen
          ? "fixed inset-4 z-50 flex flex-col justify-between bg-white dark:bg-neutral-950/95 p-6 shadow-2xl"
          : className
      }`}
    >
      <div className="flex items-center justify-between mb-3 border-b border-neutral-200 dark:border-neutral-800/80 pb-2.5">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-reading-accent" />
          <span className="text-xs sm:text-sm font-semibold text-neutral-900 dark:text-neutral-200 uppercase tracking-wider">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {currentSlug && (
            <div className="flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800/80 p-0.5 border border-neutral-200 dark:border-neutral-700/50 text-xs">
              <button
                type="button"
                onClick={() => setMode("local")}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  mode === "local"
                    ? "bg-theme/15 text-reading-accent font-medium shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                Local
              </button>
              <button
                type="button"
                onClick={() => setMode("global")}
                className={`px-2 py-0.5 rounded-md transition-colors ${
                  mode === "global"
                    ? "bg-theme/15 text-reading-accent font-medium shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                }`}
              >
                Global
              </button>
              {mode === "local" && (
                <button type="button" onClick={() => setLocalDepth(localDepth === 1 ? 2 : 1)} className="border-l border-neutral-300 px-2 py-0.5 text-neutral-600 dark:border-neutral-700 dark:text-neutral-400" title="Toggle local graph depth">
                  {localDepth}-hop
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800/60 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Graph"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <label className="flex min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-neutral-200 bg-white/70 px-2.5 py-1.5 text-xs dark:border-neutral-800 dark:bg-neutral-950/40">
          <Search className="h-3.5 w-3.5 text-neutral-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a concept or article..." className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-neutral-500" aria-label="Find a concept or article in the graph" />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="Clear graph search"><RotateCcw className="h-3.5 w-3.5 text-neutral-500" /></button>}
        </label>
        <div className="flex items-center gap-3 text-[10px] text-neutral-500">
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-reading-accent" />current</span>
          <span><i className="mr-1 inline-block h-2 w-2 rounded-full bg-amber-500" />match</span>
        </div>
      </div>

      <div className="relative w-full flex-1 min-h-[260px] flex items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full block rounded-lg text-reading-accent" />
        {filteredData.nodes.length === 0 && (
          <p className="absolute text-xs text-neutral-600 dark:text-neutral-500">No graph connections found</p>
        )}
      </div>

      {selectedNode && (
        <div className="mt-3 rounded-lg border border-neutral-200 bg-white/70 p-3 dark:border-neutral-800 dark:bg-neutral-950/40">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">{selectedNode.title}</p>
              <p className="mt-1 text-[11px] text-neutral-500">{selectedConnections} connection{selectedConnections === 1 ? "" : "s"}{selectedNode.category ? ` · ${selectedNode.category}` : ""}</p>
              {selectedNode.tags.length > 0 && <p className="mt-2 line-clamp-1 text-[11px] text-neutral-500">{selectedNode.tags.join(" · ")}</p>}
            </div>
            <button type="button" onClick={() => router.push(`/blog/${selectedNode.id}`)} className="inline-flex shrink-0 items-center gap-1 rounded-md bg-theme/10 px-2 py-1 text-[11px] font-medium text-reading-accent hover:bg-theme/20">
              Open <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-600 dark:text-neutral-500">
        <span>
          {filteredData.nodes.length} nodes · {filteredData.links.length} links
        </span>
        <span className="hidden sm:inline">Click to inspect · use Open to read</span>
      </div>
    </div>
  );
}

export default GraphView;
