/// <reference types="vite/client" />
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Murli, AbhyasForm, CourseDay } from '../types';

// ✅ VITE ENV FIX (CRITICAL)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (SUPABASE_URL && SUPABASE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.warn('⚠️ Supabase ENV not found. Falling back to seed data.');
}

// ======================
// FETCH FUNCTIONS
// ======================

export const fetchMurlis = async (): Promise<Murli[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from('murlis')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      console.error('Error fetching murlis:', error);
    } else if (data) {
      return data as Murli[];
    }
  }
  return [];
};

export const fetchAbhyas = async (): Promise<AbhyasForm[]> => {
  if (supabase) {
    const { data, error } = await supabase.from('abhyas').select('*');

    if (error) {
      console.error('Error fetching abhyas:', error);
    } else if (data) {
      return data as AbhyasForm[];
    }
  }
  return [];
};

export const fetchCourseDays = async (): Promise<CourseDay[]> => {
  if (supabase) {
    const { data, error } = await supabase
      .from('course_days')
      .select('*')
      .order('day', { ascending: true });

    if (error) {
      console.error('Error fetching course days:', error);
    } else if (data) {
      return data as CourseDay[];
    }
  }
  return [];
};

// ======================
// INSERT FUNCTIONS
// ======================

export const insertMurli = async (murli: Omit<Murli, 'id' | 'is_favorite'>) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from('murlis').insert([murli]).select();
  if (error) throw error;
  return data;
};

export const insertAbhyas = async (abhyas: Omit<AbhyasForm, 'id'>) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from('abhyas').insert([abhyas]).select();
  if (error) throw error;
  return data;
};

export const insertCourseDay = async (courseDay: CourseDay) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from('course_days').insert([courseDay]).select();
  if (error) throw error;
  return data;
};

// ======================
// UPDATE FUNCTIONS
// ======================

export const updateMurli = async (id: string, murli: Partial<Murli>) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from('murlis').update(murli).eq('id', id).select();
  if (error) throw error;
  return data;
};

export const updateAbhyas = async (id: string, abhyas: Partial<AbhyasForm>) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from('abhyas').update(abhyas).eq('id', id).select();
  if (error) throw error;
  return data;
};

export const updateCourseDay = async (id: string, courseDay: Partial<CourseDay>) => {
  if (!supabase) throw new Error("Supabase client not initialized");
  const { data, error } = await supabase.from('course_days').update(courseDay).eq('id', id).select();
  if (error) throw error;
  return data;
};

// ======================
// LOCAL STORAGE
// ======================

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