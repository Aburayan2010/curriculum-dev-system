import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import type { Course } from '@/lib/types';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: err } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setCourses(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch courses';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCourse = useCallback(
    async (courseData: Omit<Course, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error: err } = await supabase
          .from('courses')
          .insert([courseData])
          .select();

        if (err) throw err;
        toast.success('Course created successfully');
        await fetchCourses();
        return data?.[0];
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create course';
        toast.error(message);
        throw err;
      }
    },
    [fetchCourses]
  );

  const updateCourse = useCallback(
    async (id: string, courseData: Partial<Course>) => {
      try {
        const { error: err } = await supabase
          .from('courses')
          .update(courseData)
          .eq('id', id);

        if (err) throw err;
        toast.success('Course updated successfully');
        await fetchCourses();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update course';
        toast.error(message);
        throw err;
      }
    },
    [fetchCourses]
  );

  const deleteCourse = useCallback(
    async (id: string) => {
      try {
        const { error: err } = await supabase.from('courses').delete().eq('id', id);

        if (err) throw err;
        toast.success('Course deleted successfully');
        await fetchCourses();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete course';
        toast.error(message);
        throw err;
      }
    },
    [fetchCourses]
  );

  return {
    courses,
    loading,
    error,
    fetchCourses,
    createCourse,
    updateCourse,
    deleteCourse,
  };
}
