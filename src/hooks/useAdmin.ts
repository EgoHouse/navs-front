import { useState } from 'react';
import { CatalogService } from '../services';
import { useAuth } from '../contexts/AuthContext';
import type { 
  Category, 
  CreateCategoryRequest, 
  UpdateCategoryRequest,
  AddItemRequest,
  ApiError 
} from '../types';

// Hook para operaciones CRUD de categorías (solo para admins)
export const useCategoryAdmin = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';

  const createCategory = async (data: CreateCategoryRequest): Promise<Category | null> => {
    if (!isAdmin) {
      setError('No tienes permisos para crear categorías');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const newCategory = await CatalogService.createCategory(data);
      return newCategory;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id: string, data: UpdateCategoryRequest): Promise<Category | null> => {
    if (!isAdmin) {
      setError('No tienes permisos para actualizar categorías');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const updatedCategory = await CatalogService.updateCategory(id, data);
      return updatedCategory;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string): Promise<boolean> => {
    if (!isAdmin) {
      setError('No tienes permisos para eliminar categorías');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      await CatalogService.deleteCategory(id);
      return true;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    isLoading,
    error,
    clearError,
    isAdmin,
  };
};

// Hook para operaciones CRUD de items (solo para admins)
export const useItemAdmin = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = user?.role === 'ADMIN';

  const addItem = async (data: AddItemRequest): Promise<Category | null> => {
    if (!isAdmin) {
      setError('No tienes permisos para agregar items');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const updatedCategory = await CatalogService.addItem(data);
      return updatedCategory;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItem = async (categoryId: string, itemName: string): Promise<boolean> => {
    if (!isAdmin) {
      setError('No tienes permisos para eliminar items');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);
      await CatalogService.deleteItem(categoryId, itemName);
      return true;
    } catch (error) {
      const apiError = error as ApiError;
      setError(apiError.message.toString());
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    addItem,
    deleteItem,
    isLoading,
    error,
    clearError,
    isAdmin,
  };
};

// Hook combinado para todas las operaciones de administración
export const useAdminOperations = () => {
  const categoryAdmin = useCategoryAdmin();
  const itemAdmin = useItemAdmin();
  const { user } = useAuth();

  const isAdmin = user?.role === 'ADMIN';
  const isLoading = categoryAdmin.isLoading || itemAdmin.isLoading;
  const error = categoryAdmin.error || itemAdmin.error;

  const clearAllErrors = () => {
    categoryAdmin.clearError();
    itemAdmin.clearError();
  };

  return {
    // Category operations
    createCategory: categoryAdmin.createCategory,
    updateCategory: categoryAdmin.updateCategory,
    deleteCategory: categoryAdmin.deleteCategory,
    
    // Item operations
    addItem: itemAdmin.addItem,
    deleteItem: itemAdmin.deleteItem,
    
    // State
    isLoading,
    error,
    clearError: clearAllErrors,
    isAdmin,
  };
};