import { NextResponse } from "next/server";
import { getAlgorithmCatalogEntry, getAlgorithmContentBySlug } from "@/features/algorithms/lib/catalog";

interface AlgorithmContentRouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_request: Request, { params }: AlgorithmContentRouteProps) {
  const { slug } = await params;

  if (!getAlgorithmCatalogEntry(slug)) {
    return NextResponse.json({ error: "Algorithm not found" }, { status: 404 });
  }

  const algorithmContent = getAlgorithmContentBySlug(slug);

  if (!algorithmContent) {
    return NextResponse.json({ error: "Algorithm content not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: algorithmContent.id,
    title: algorithmContent.title,
    description: algorithmContent.description,
    content: algorithmContent.content,
    frontmatter: algorithmContent.frontmatter,
  });
}
