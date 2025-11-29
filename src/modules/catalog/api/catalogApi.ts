import { apiClient } from '@lib/api/apiClient';
import type {
  Category,
  MenuItem,
  ItemSearchResult,
  CatalogStats,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  AddItemRequest,
  UpdateItemRequest,
  UpdateSubcategoryNameRequest,
  UpdateSubsectionNameRequest,
  DeleteResponse,
  DeleteItemResponse,
} from '../types';

// ===== PUBLIC ENDPOINTS (No authentication required) =====

/**
 * Get all categories from catalog
 */
export const getAllCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/catalog');
  return response.data;
};

/**
 * Get full menu (alias of getAllCategories)
 */
export const getFullMenu = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/catalog/menu');
  return response.data;
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`/catalog/category/${id}`);
  return response.data;
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const response = await apiClient.get<Category>(`/catalog/slug/${slug}`);
  return response.data;
};

/**
 * Get items from a specific category
 */
export const getCategoryItems = async (categoryId: string): Promise<MenuItem[]> => {
  const response = await apiClient.get<MenuItem[]>(`/catalog/category/${categoryId}/items`);
  return response.data;
};

/**
 * Search categories by term
 */
export const searchCategories = async (searchTerm: string): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/catalog/search/categories', {
    params: { q: searchTerm },
  });
  return response.data;
};

/**
 * Search items by term
 */
export const searchItems = async (searchTerm: string): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>('/catalog/search/items', {
    params: { q: searchTerm },
  });
  return response.data;
};

/**
 * Search specific item in a category
 */
export const searchItemInCategory = async (
  categoryId: string,
  itemName: string
): Promise<ItemSearchResult> => {
  const response = await apiClient.get<ItemSearchResult>(
    `/catalog/category/${categoryId}/item/${itemName}`
  );
  return response.data;
};

// ===== PROTECTED ENDPOINTS (ADMIN only) =====

/**
 * Create new category (requires ADMIN role)
 */
export const createCategory = async (data: CreateCategoryRequest): Promise<Category> => {
  const response = await apiClient.post<Category>('/catalog/category', data);
  return response.data;
};

/**
 * Update existing category (requires ADMIN role)
 */
export const updateCategory = async (
  id: string,
  data: UpdateCategoryRequest
): Promise<Category> => {
  const response = await apiClient.put<Category>(`/catalog/category/${id}`, data);
  return response.data;
};

/**
 * Delete category (requires ADMIN role)
 */
export const deleteCategory = async (id: string): Promise<DeleteResponse> => {
  const response = await apiClient.delete<DeleteResponse>(`/catalog/category/${id}`);
  return response.data;
};

/**
 * Add item to subcategory (requires ADMIN role)
 */
export const addItem = async (data: AddItemRequest, imageFile?: File): Promise<Category> => {
  if (imageFile) {
    // If image exists, use FormData
    const formData = new FormData();
    formData.append('categoryId', data.categoryId);
    formData.append('subcategoryName', data.subcategoryName);
    if (data.subsectionName) {
      formData.append('subsectionName', data.subsectionName);
    }
    formData.append('item', JSON.stringify(data.item));
    formData.append('image', imageFile);

    const response = await apiClient.post<Category>('/catalog/item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    // No image, use JSON
    const response = await apiClient.post<Category>('/catalog/item', data);
    return response.data;
  }
};

/**
 * Delete item from category (requires ADMIN role)
 */
export const deleteItem = async (
  categoryId: string,
  itemName: string
): Promise<DeleteItemResponse> => {
  const response = await apiClient.delete<DeleteItemResponse>(
    `/catalog/category/${categoryId}/item/${itemName}`
  );
  return response.data;
};

/**
 * Update existing item (requires ADMIN role)
 */
export const updateItem = async (
  data: UpdateItemRequest,
  imageFile?: File
): Promise<Category> => {
  if (imageFile) {
    // If image exists, use FormData
    const formData = new FormData();
    formData.append('categoryId', data.categoryId);
    formData.append('subcategoryName', data.subcategoryName);
    if (data.subsectionName) {
      formData.append('subsectionName', data.subsectionName);
    }
    formData.append('itemName', data.itemName);
    formData.append('itemData', JSON.stringify(data.itemData));
    formData.append('image', imageFile);

    const response = await apiClient.put<Category>('/catalog/item', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    // No image, use JSON
    const response = await apiClient.put<Category>('/catalog/item', data);
    return response.data;
  }
};

/**
 * Update subcategory name (requires ADMIN role)
 */
export const updateSubcategoryName = async (
  data: UpdateSubcategoryNameRequest
): Promise<Category> => {
  const response = await apiClient.put<Category>('/catalog/subcategory/name', data);
  return response.data;
};

/**
 * Update subsection name (requires ADMIN role)
 */
export const updateSubsectionName = async (
  data: UpdateSubsectionNameRequest
): Promise<Category> => {
  const response = await apiClient.put<Category>('/catalog/subsection/name', data);
  return response.data;
};

// ===== UTILITY FUNCTIONS =====

/**
 * Find item by name in all categories
 */
export const findItemByName = async (itemName: string): Promise<ItemSearchResult | null> => {
  try {
    const categories = await searchItems(itemName);

    for (const category of categories) {
      for (const subcategory of category.subcategories) {
        // Search in direct items
        const directItem = subcategory.items?.find((item) =>
          item.name.toLowerCase().includes(itemName.toLowerCase())
        );

        if (directItem) {
          return {
            item: directItem,
            location: {
              subcategoryName: subcategory.name,
            },
          };
        }

        // Search in subsections
        if (subcategory.subsections) {
          for (const subsection of subcategory.subsections) {
            const subsectionItem = subsection.items.find((item) =>
              item.name.toLowerCase().includes(itemName.toLowerCase())
            );

            if (subsectionItem) {
              return {
                item: subsectionItem,
                location: {
                  subcategoryName: subcategory.name,
                  subsectionName: subsection.name,
                },
              };
            }
          }
        }
      }
    }

    return null;
  } catch {
    return null;
  }
};

/**
 * Get all items from all categories (flattened)
 */
export const getAllItems = async (): Promise<MenuItem[]> => {
  const categories = await getAllCategories();
  const allItems: MenuItem[] = [];

  categories.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      // Add direct items
      if (subcategory.items) {
        allItems.push(...subcategory.items);
      }

      // Add items from subsections
      if (subcategory.subsections) {
        subcategory.subsections.forEach((subsection) => {
          allItems.push(...subsection.items);
        });
      }
    });
  });

  return allItems;
};

/**
 * Get catalog statistics
 */
export const getCatalogStats = async (): Promise<CatalogStats> => {
  const categories = await getAllCategories();

  let totalSubcategories = 0;
  let totalItems = 0;
  let totalSubsections = 0;

  categories.forEach((category) => {
    totalSubcategories += category.subcategories.length;

    category.subcategories.forEach((subcategory) => {
      if (subcategory.items) {
        totalItems += subcategory.items.length;
      }

      if (subcategory.subsections) {
        totalSubsections += subcategory.subsections.length;
        subcategory.subsections.forEach((subsection) => {
          totalItems += subsection.items.length;
        });
      }
    });
  });

  return {
    totalCategories: categories.length,
    totalSubcategories,
    totalItems,
    totalSubsections,
  };
};
