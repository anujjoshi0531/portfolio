export interface BlogPlaylistArticle {
  slug: string;
  title: string;
  description: string;
  href: string;
  category?: string;
  tags: string[];
}

export interface BlogPlaylistSectionManifest {
  title: string;
  items: string[];
}

export interface BlogPlaylistManifest {
  id: string;
  title: string;
  description: string;
  summary?: string;
  sections: BlogPlaylistSectionManifest[];
}

export interface BlogPlaylistSection {
  title: string;
  items: BlogPlaylistArticle[];
}

export interface BlogPlaylist {
  id: string;
  title: string;
  description: string;
  summary?: string;
  sections: BlogPlaylistSection[];
  itemCount: number;
}

export interface BlogPlaylistContext {
  playlist: Pick<BlogPlaylist, "id" | "title" | "description" | "itemCount">;
  previous?: BlogPlaylistArticle;
  current: BlogPlaylistArticle;
  next?: BlogPlaylistArticle;
  position: number;
}
