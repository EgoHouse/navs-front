import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import * as catalogApi from '../api';
import type { Category, MenuItem, CatalogStats } from '../types';

/**
 * Query keys for catalog queries
 */
export const CATALOG_QUERY_KEYS = {
  all: ['catalog'] as const,
  categories: () => [...CATALOG_QUERY_KEYS.all, 'categories'] as const,
  category: (id: string) => [...CATALOG_QUERY_KEYS.all, 'category', id] as const,
  categoryBySlug: (slug: string) => [...CATALOG_QUERY_KEYS.all, 'category', 'slug', slug] as const,
  items: () => [...CATALOG_QUERY_KEYS.all, 'items'] as const,
  stats: () => [...CATALOG_QUERY_KEYS.all, 'stats'] as const,
  search: (term: string) => [...CATALOG_QUERY_KEYS.all, 'search', term] as const,
} as const;

/**
 * Hook to get all categories
 */
export const useCategories = (): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.categories(),
    queryFn: catalogApi.getAllCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes - catalog data doesn't change often
    gcTime: 30 * 60 * 1000, // 30 minutes cache time (formerly cacheTime)
  });
};

/**
 * Hook to get category by ID
 */
export const useCategoryById = (id: string): UseQueryResult<Category, Error> => {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.category(id),
    queryFn: () => catalogApi.getCategoryById(id),
    enabled: !!id, // Only run if id exists
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to get category by slug
 */
export const useCategoryBySlug = (slug: string | undefined): UseQueryResult<Category, Error> => {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.categoryBySlug(slug || ''),
    queryFn: () => catalogApi.getCategoryBySlug(slug!),
    enabled: !!slug, // Only run if slug exists
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to get all items (flattened)
 */
export const useAllItems = (): UseQueryResult<MenuItem[], Error> => {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.items(),
    queryFn: catalogApi.getAllItems,
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to get catalog statistics
 */
export const useCatalogStats = (): UseQueryResult<CatalogStats, Error> => {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.stats(),
    queryFn: catalogApi.getCatalogStats,
    staleTime: 10 * 60 * 1000,
  });
};

/**
 * Hook to search items
 */
export const useSearchItems = (searchTerm: string): UseQueryResult<Category[], Error> => {
  return useQuery({
    queryKey: CATALOG_QUERY_KEYS.search(searchTerm),
    queryFn: () => catalogApi.searchItems(searchTerm),
    enabled: searchTerm.trim().length > 0, // Only search if term is not empty
    staleTime: 5 * 60 * 1000, // Search results are less stable
  });
};
