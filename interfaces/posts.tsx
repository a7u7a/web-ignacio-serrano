// aboutCollection schema from CMS config public/admin/config.yml

// optional
// contentEnglish?: string;
// titleEnglish?: string;
// thumbnail?: string;
// tags?: string[];
// category?: string // used in Sensiblog
// stock?: number;
// price?: number;

export interface basePost {
  date: string;
  title: string;
  contentSpanish: string; // post body
  id: string; // post filename
}

export interface aboutPost extends basePost {
  contentEnglish: string;
}

export interface feedPost extends basePost {
  thumbnail: string;
  tags: string[];
}