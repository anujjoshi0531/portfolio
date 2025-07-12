type NotionPage = {
  object: "page";
  id: string;
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
  };
  cover?: {
    type: "external";
    external: {
      url: string;
    };
  };
  icon?: {
    type: "emoji";
    emoji: string;
  };
  parent: {
    type: "database_id";
    database_id: string;
  };
  archived: boolean;
  in_trash: boolean;
  properties: {
    [key: string]: any;
    "Last Updated"?: {
      id: string;
      type: "last_edited_time";
      last_edited_time: string;
    };
    "Thumbnail"?: {
      id: string;
      type: "url";
      url: string | null;
    };
        "Github"?: {
      id: string;
      type: "url";
      url: string | null;
    };
        "Link"?: {
      id: string;
      type: "url";
      url: string | null;
    };
    "Public"?: {
      id: string;
      type: "checkbox";
      checkbox: boolean;
    };
    "Project"?: {
      id: string;
      type: "checkbox";
      checkbox: boolean;
    };
    "Tags"?: {
      id: string;
      type: "multi_select";
      multi_select: {
        id: string;
        name: string;
        color: string;
      }[];
    };
    "Slug"?: {
      id: string;
      type: "rich_text";
      rich_text: RichText[];
    };
    "Published"?: {
      id: string;
      type: "date";
      date: {
        start: string;
        end: string | null;
        time_zone: string | null;
      };
    };
    "Tweet"?: {
      id: string;
      type: "rich_text";
      rich_text: RichText[];
    };
    "Created"?: {
      id: string;
      type: "created_time";
      created_time: string;
    };
    "Author"?: {
      id: string;
      type: "rich_text";
      rich_text: RichText[];
    };
    "Description"?: {
      id: string;
      type: "rich_text";
      rich_text: RichText[];
    };
    "Name"?: {
      id: string;
      type: "title";
      title: RichText[];
    };
  };
  url: string;
  public_url?: string;
};

type RichText = {
  type: "text";
  text: {
    content: string;
    link: {
      url: string;
    } | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
};

type NotionPageList = {
  object: "list";
  results: NotionPage[];
};