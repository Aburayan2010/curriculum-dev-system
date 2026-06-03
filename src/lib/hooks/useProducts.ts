import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/lib/types';

export function useProducts(courseId?: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase.from('products').select('*');
      
      if (courseId) {
        query = query.eq('course_id', courseId);
      }

      const { data, error: err } = await query.order('created_at', { ascending: false });

      if (err) throw err;
      setProducts(data || []);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch products';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  const createProduct = useCallback(
    async (productData: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const { data, error: err } = await supabase
          .from('products')
          .insert([productData])
          .select();

        if (err) throw err;
        toast.success('Product created successfully');
        await fetchProducts();
        return data?.[0];
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create product';
        toast.error(message);
        throw err;
      }
    },
    [fetchProducts]
  );

  const updateProduct = useCallback(
    async (id: string, productData: Partial<Product>) => {
      try {
        const { error: err } = await supabase
          .from('products')
          .update(productData)
          .eq('id', id);

        if (err) throw err;
        toast.success('Product updated successfully');
        await fetchProducts();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to update product';
        toast.error(message);
        throw err;
      }
    },
    [fetchProducts]
  );

  const deleteProduct = useCallback(
    async (id: string) => {
      try {
        const { error: err } = await supabase.from('products').delete().eq('id', id);

        if (err) throw err;
        toast.success('Product deleted successfully');
        await fetchProducts();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to delete product';
        toast.error(message);
        throw err;
      }
    },
    [fetchProducts]
  );

  return {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
