import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SEED_MURLIS, SEED_ABHYAS, SEED_COURSE } from './data';
import { Murli, AbhyasForm, CourseDay } from '../types';

// NOTE: In a real deployment, these would come from import.meta.env
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL || '';
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY || '';

let supabase: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
}

// Helper to simulate network delay for realistic UI testing
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMurlis = async (): Promise<Murli[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('murlis').select('*').order('date', { ascending: false });
    if (!error && data) return data as Murli[];
  }
  // Fallback
  await delay(300);
  return SEED_MURLIS;
};

export const fetchAbhyas = async (): Promise<AbhyasForm[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('abhyas').select('*');
    if (!error && data) return data as AbhyasForm[];
  }
  await delay(200);
  return SEED_ABHYAS;
};

export const fetchCourseDays = async (): Promise<CourseDay[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('course_days').select('*').order('day', { ascending: true });
    if (!error && data) return data as CourseDay[];
  }
  await delay(200);
  return SEED_COURSE;
};

// Local Storage Wrappers
const STORAGE_KEY = 'bk_space_user_data';

export const getUserProgress = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return {
    favorites: [],
    completedCourseDays: [],
    completedPractices: []
  };
};

export const toggleFavorite = (id: string) => {
  const data = getUserProgress();
  if (data.favorites.includes(id)) {
    data.favorites = data.favorites.filter((favId: string) => favId !== id);
  } else {
    data.favorites.push(id);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data.favorites;
};

export const toggleCourseDay = (day: number) => {
  const data = getUserProgress();
  if (data.completedCourseDays.includes(day)) {
    data.completedCourseDays = data.completedCourseDays.filter((d: number) => d !== day);
  } else {
    data.completedCourseDays.push(day);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data.completedCourseDays;
};