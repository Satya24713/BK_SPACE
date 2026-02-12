
export interface Murli {
  id: string;
  date: string;
  type: 'Sakar' | 'Avyakt';
  title_hindi: string;
  content_hindi: string;
  content_english: string;
  audio_url?: string;
  youtube_id?: string;
  is_favorite?: boolean; // Local state helper
}

export interface AbhyasForm {
  id: string;
  title: string;
  hindi_title: string;
  description: string;
  description_hindi: string;
  color_theme: string;
}

export interface CourseDay {
  day: number;
  title: string;
  title_hindi: string;
  theme_hindi: string;
  resources: string[]; // Links or text
  reflection: string;
  reflection_hindi: string;
}

export interface UserProgress {
  favorites: string[]; // Murli IDs
  completedCourseDays: number[]; // Day numbers
  completedPractices: string[]; // Date + PracticeID composite keys
}
