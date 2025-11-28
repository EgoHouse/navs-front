import { useState, useEffect, useRef } from 'react';
import { CatalogService } from '../services';
import type { Category, MenuItem, ApiError } from '../types';

// Caché global compartido entre todas las instancias del hook
let categoriesCache: Category[] | null = null;
let categoriesCachePromise: Promise<Category[]> | null = null;

// Hook para obtener todas las categorías
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>(categoriesCache || []);
  const [isLoading, setIsLoading] = useState(!categoriesCache);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef(true);

  const fetchCategories = async (force = false) => {
    // Si ya hay datos en caché y no es forzado, usar el caché
    if (categoriesCache && !force) {
      setCategories(categoriesCache);
      setIsLoading(false);
      return categoriesCache;
    }

    // Si ya hay una petición en curso, esperar a que termine
    if (categoriesCachePromise && !force) {
      try {
        const data = await categoriesCachePromise;
        if (isMountedRef.current) {
          setCategories(data);
          setIsLoading(false);
        }
        return data;
      } catch (error) {
        // La promesa falló, intentar de nuevo
      }
    }

    try {
      setIsLoading(true);
      setError(null);
      
      // Crear la promesa de carga
      categoriesCachePromise = CatalogService.getAllCategories();
      const data = await categoriesCachePromise;
      
      // Guardar en caché
      categoriesCache = data;
      
      if (isMountedRef.current) {
        setCategories(data);
      }
      
      return data;
    } catch (error) {
      const apiError = error as ApiError;
      if (isMountedRef.current) {
        setError(apiError.message.toString());
      }
      categoriesCachePromise = null;
      throw error;
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
      categoriesCachePromise = null;
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    
    // Solo hacer fetch si no hay datos en caché
    if (!categoriesCache) {
      fetchCategories();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    categories,
    isLoading,
    error,
    refetch: (force = true) => fetchCategories(force),
  };
};

// Hook para obtener una categoría por slug
export const useCategoryBySlug = (slug: string | undefined) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setCategory(null);
      setIsLoading(false);
      return;
    }

    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogService.getCategoryBySlug(slug);
        setCategory(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message.toString());
        setCategory(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [slug]);

  return {
    category,
    isLoading,
    error,
  };
};

// Hook para búsqueda de items
export const useItemSearch = () => {
  const [results, setResults] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchItems = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await CatalogService.searchItems(query);
      setResults(data);
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setResults([]);
    setError(null);
  };

  return {
    results,
    isLoading,
    error,
    searchItems,
    clearResults,
  };
};

// Hook para obtener estadísticas del catálogo
export const useCatalogStats = () => {
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalSubcategories: 0,
    totalItems: 0,
    totalSubsections: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogService.getCatalogStats();
        setStats(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return {
    stats,
    isLoading,
    error,
  };
};

// Hook para obtener todos los items de forma plana
export const useAllItems = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await CatalogService.getAllItems();
        setItems(data);
      } catch (error) {
        const apiError = error as ApiError;
        setError(apiError.message.toString());
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllItems();
  }, []);

  return {
    items,
    isLoading,
    error,
  };
};