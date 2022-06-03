// aboutCollection schema from CMS config public/admin/config.yml
export interface basePost {
  // common to all posts
  date: string;
  title: string;
  contentSpanish: string; // post body
  id: string; // post filename
}

export interface aboutPost extends basePost {
  contentEnglish: string;
}

// optional
// contentEnglish?: string;
// titleEnglish?: string;
// thumbnail?: string;
// tags?: string[];
// category?: string // used in Sensiblog
// stock?: number;
// price?: number;
