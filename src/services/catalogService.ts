import { apiClient, makeRequest } from '../utils/api';
import type {
  Category,
  MenuItem,
  CreateCategoryRequest,
  UpdateCategoryRequest,
  AddItemRequest,
  UpdateItemRequest,
  UpdateSubcategoryNameRequest,
  UpdateSubsectionNameRequest,
  DeleteResponse,
  DeleteItemResponse,
  ItemSearchResult
} from '../types';

/**
 * Servicio de Catálogo/Menú
 * Maneja todas las operaciones relacionadas con categorías, items y búsquedas
 */
export class CatalogService {
  
  // ===== ENDPOINTS PÚBLICOS (Sin autenticación) =====

  /**
   * Obtener todas las categorías del catálogo
   */
  static async getAllCategories(): Promise<Category[]> {
    return makeRequest(() => 
      apiClient.get<Category[]>('/catalog')
    );
  }

  /**
   * Obtener menú completo (alias de getAllCategories)
   */
  static async getFullMenu(): Promise<Category[]> {
    return makeRequest(() => 
      apiClient.get<Category[]>('/catalog/menu')
    );
  }

  /**
   * Obtener categoría por ID
   */
  static async getCategoryById(id: string): Promise<Category> {
    return makeRequest(() => 
      apiClient.get<Category>(`/catalog/category/${id}`)
    );
  }

  /**
   * Obtener categoría por slug
   */
  static async getCategoryBySlug(slug: string): Promise<Category> {
    return makeRequest(() => 
      apiClient.get<Category>(`/catalog/slug/${slug}`)
    );
  }

  /**
   * Obtener items de una categoría específica
   */
  static async getCategoryItems(categoryId: string): Promise<MenuItem[]> {
    return makeRequest(() => 
      apiClient.get<MenuItem[]>(`/catalog/category/${categoryId}/items`)
    );
  }

  /**
   * Buscar categorías por término
   */
  static async searchCategories(searchTerm: string): Promise<Category[]> {
    return makeRequest(() => 
      apiClient.get<Category[]>(`/catalog/search/categories`, {
        params: { q: searchTerm }
      })
    );
  }

  /**
   * Buscar items por término
   */
  static async searchItems(searchTerm: string): Promise<Category[]> {
    return makeRequest(() => 
      apiClient.get<Category[]>(`/catalog/search/items`, {
        params: { q: searchTerm }
      })
    );
  }

  /**
   * Buscar item específico en una categoría
   */
  static async searchItemInCategory(categoryId: string, itemName: string): Promise<ItemSearchResult> {
    return makeRequest(() => 
      apiClient.get<ItemSearchResult>(`/catalog/category/${categoryId}/item/${itemName}`)
    );
  }

  // ===== ENDPOINTS PROTEGIDOS (Solo ADMIN) =====

  /**
   * Crear nueva categoría (requiere rol ADMIN)
   */
  static async createCategory(data: CreateCategoryRequest): Promise<Category> {
    return makeRequest(() => 
      apiClient.post<Category>('/catalog/category', data)
    );
  }

  /**
   * Actualizar categoría existente (requiere rol ADMIN)
   */
  static async updateCategory(id: string, data: UpdateCategoryRequest): Promise<Category> {
    return makeRequest(() => 
      apiClient.put<Category>(`/catalog/category/${id}`, data)
    );
  }

  /**
   * Eliminar categoría (requiere rol ADMIN)
   */
  static async deleteCategory(id: string): Promise<DeleteResponse> {
    return makeRequest(() => 
      apiClient.delete<DeleteResponse>(`/catalog/category/${id}`)
    );
  }

  /**
   * Agregar item a subcategoría (requiere rol ADMIN)
   */
  static async addItem(data: AddItemRequest, imageFile?: File): Promise<Category> {
    return makeRequest(() => {
      if (imageFile) {
        // Si hay imagen, usar FormData
        const formData = new FormData();
        formData.append('categoryId', data.categoryId);
        formData.append('subcategoryName', data.subcategoryName);
        if (data.subsectionName) {
          formData.append('subsectionName', data.subsectionName);
        }
        formData.append('item', JSON.stringify(data.item));
        formData.append('image', imageFile);
        
        return apiClient.post<Category>('/catalog/item', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Sin imagen, usar JSON
        return apiClient.post<Category>('/catalog/item', data);
      }
    });
  }

  /**
   * Eliminar item de categoría (requiere rol ADMIN)
   */
  static async deleteItem(categoryId: string, itemName: string): Promise<DeleteItemResponse> {
    return makeRequest(() => 
      apiClient.delete<DeleteItemResponse>(`/catalog/category/${categoryId}/item/${itemName}`)
    );
  }

  // ===== ENDPOINTS DE EDICIÓN (Solo ADMIN) =====

  /**
   * Actualizar item existente (requiere rol ADMIN)
   * Permite actualizar cualquier campo de un item específico, incluyendo la opción de cambiar su imagen
   */
  static async updateItem(data: UpdateItemRequest, imageFile?: File): Promise<Category> {
    return makeRequest(() => {
      if (imageFile) {
        // Si hay imagen, usar FormData
        const formData = new FormData();
        formData.append('categoryId', data.categoryId);
        formData.append('subcategoryName', data.subcategoryName);
        if (data.subsectionName) {
          formData.append('subsectionName', data.subsectionName);
        }
        formData.append('itemName', data.itemName);
        formData.append('itemData', JSON.stringify(data.itemData));
        formData.append('image', imageFile);
        
        return apiClient.put<Category>('/catalog/item', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        // Sin imagen, usar JSON
        return apiClient.put<Category>('/catalog/item', data);
      }
    });
  }

  /**
   * Actualizar nombre de subcategoría (requiere rol ADMIN)
   */
  static async updateSubcategoryName(data: UpdateSubcategoryNameRequest): Promise<Category> {
    return makeRequest(() => 
      apiClient.put<Category>('/catalog/subcategory/name', data)
    );
  }

  /**
   * Actualizar nombre de subsección (requiere rol ADMIN)
   */
  static async updateSubsectionName(data: UpdateSubsectionNameRequest): Promise<Category> {
    return makeRequest(() => 
      apiClient.put<Category>('/catalog/subsection/name', data)
    );
  }

  // ===== MÉTODOS AUXILIARES =====

  /**
   * Buscar item por nombre en todas las categorías
   */
  static async findItemByName(itemName: string): Promise<ItemSearchResult | null> {
    try {
      const categories = await this.searchItems(itemName);
      
      for (const category of categories) {
        for (const subcategory of category.subcategories) {
          // Buscar en items directos
          const directItem = subcategory.items?.find(item => 
            item.name.toLowerCase().includes(itemName.toLowerCase())
          );
          
          if (directItem) {
            return {
              item: directItem,
              location: {
                subcategoryName: subcategory.name
              }
            };
          }

          // Buscar en subsecciones
          if (subcategory.subsections) {
            for (const subsection of subcategory.subsections) {
              const subsectionItem = subsection.items.find(item => 
                item.name.toLowerCase().includes(itemName.toLowerCase())
              );
              
              if (subsectionItem) {
                return {
                  item: subsectionItem,
                  location: {
                    subcategoryName: subcategory.name,
                    subsectionName: subsection.name
                  }
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
  }

  /**
   * Obtener todos los items de todas las categorías (plano)
   */
  static async getAllItems(): Promise<MenuItem[]> {
    const categories = await this.getAllCategories();
    const allItems: MenuItem[] = [];

    categories.forEach(category => {
      category.subcategories.forEach(subcategory => {
        // Agregar items directos
        if (subcategory.items) {
          allItems.push(...subcategory.items);
        }

        // Agregar items de subsecciones
        if (subcategory.subsections) {
          subcategory.subsections.forEach(subsection => {
            allItems.push(...subsection.items);
          });
        }
      });
    });

    return allItems;
  }

  /**
   * Obtener estadísticas del catálogo
   */
  static async getCatalogStats(): Promise<{
    totalCategories: number;
    totalSubcategories: number;
    totalItems: number;
    totalSubsections: number;
  }> {
    const categories = await this.getAllCategories();
    
    let totalSubcategories = 0;
    let totalItems = 0;
    let totalSubsections = 0;

    categories.forEach(category => {
      totalSubcategories += category.subcategories.length;
      
      category.subcategories.forEach(subcategory => {
        if (subcategory.items) {
          totalItems += subcategory.items.length;
        }
        
        if (subcategory.subsections) {
          totalSubsections += subcategory.subsections.length;
          subcategory.subsections.forEach(subsection => {
            totalItems += subsection.items.length;
          });
        }
      });
    });

    return {
      totalCategories: categories.length,
      totalSubcategories,
      totalItems,
      totalSubsections
    };
  }
}

// Exportar instancia por defecto
export default CatalogService;