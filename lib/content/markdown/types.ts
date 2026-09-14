export interface TocEntry {
  id: string;
  text: string;
  depth: number;
}

export interface RenderedMarkdown {
  html: string;
  toc: TocEntry[];
  wordCount: number;
  readingTimeMinutes: number;
  outgoingLinks: string[];
}

export interface MarkdownFileData {
  words?: number;
  toc?: TocEntry[];
  outgoingLinks?: string[];
}
