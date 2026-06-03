import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import type { ProductReview } from '@/lib/types';

export function useReviews(productId?: string) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('product_reviews').select('*');
      
      if (productId) {
        query = query.eq('product_id', productId);
      }

      const { data, error: err } = await query.order('created_at', { ascending: true });

      if (err) throw err;
      setReviews(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch reviews';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const createReview = useCallback(
    async (reviewData: Omit<ProductReview, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error: err } = await supabase
          .from('product_reviews')
          .insert([reviewData])
          .select();

        if (err) throw err;
        toast.success('Review created successfully');
        await fetchReviews();
        return data?.[0];
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create review';
        toast.error(message);
        throw err;
      }
    },
    [fetchReviews]
  );

  const updateReview = useCallback(
    async (id: string, reviewData: Partial<ProductReview>) => {
      try {
        const { error: err } = await supabase
          .from('product_reviews')
          .update(reviewData)
          .eq('id', id);

        if (err) throw err;
        toast.success('Review updated successfully');
        await fetchReviews();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update review';
        toast.error(message);
        throw err;
      }
    },
    [fetchReviews]
  );

  const deleteReview = useCallback(
    async (id: string) => {
      try {
        const { error: err } = await supabase.from('product_reviews').delete().eq('id', id);

        if (err) throw err;
        toast.success('Review deleted successfully');
        await fetchReviews();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete review';
        toast.error(message);
        throw err;
      }
    },
    [fetchReviews]
  );

  return {
    reviews,
    loading,
    error,
    fetchReviews,
    createReview,
    updateReview,
    deleteReview,
  };
}
