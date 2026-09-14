import { NextResponse } from "next/server";
import { extractMarkdownCodeBlocks } from "@/lib/algorithms/markdown-runtime";
import { getAlgorithmCatalogEntry, getAlgorithmContentBySlug } from "@/lib/server/local-content";

interface AlgorithmRuntimeRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: AlgorithmRuntimeRouteProps) {
  const { slug } = await params;

  if (!getAlgorithmCatalogEntry(slug)) {
    return NextResponse.json({ error: "Algorithm not found" }, { status: 404 });
  }

  const algorithmContent = getAlgorithmContentBySlug(slug);

  if (!algorithmContent) {
    return NextResponse.json({ error: "Algorithm content not found" }, { status: 404 });
  }

  const frontmatter = algorithmContent.frontmatter;

  return NextResponse.json({
    runtime: typeof frontmatter.runtime === "string" ? frontmatter.runtime : slug,
    input: frontmatter.input,
    codeBlocks: extractMarkdownCodeBlocks(algorithmContent.content),
    lineMaps: frontmatter.lineMaps,
    complexity: frontmatter.complexity,
    spaceComplexity: frontmatter.spaceComplexity,
    prerequisites: frontmatter.prerequisites,
    howItWorks: frontmatter.howItWorks,
  });
}
