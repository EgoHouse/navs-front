import { MENU_CATEGORIES } from '../data/menuData';

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

/**
 * Catálogo estático: la carta está hardcodeada en `../data/menuData.ts`.
 * Esta capa ya no realiza ninguna petición a backend; simplemente expone los
 * datos en memoria con la misma forma que tenían las antiguas llamadas a la API
 * para no romper a los consumidores existentes.
 */

const BACKEND_DISABLED_MESSAGE =
  'La administración de la carta está deshabilitada: el menú es estático y no hay backend.';

/** Devuelve una copia profunda para evitar mutaciones accidentales del catálogo. */
const clone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const normalize = (value: string): string =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

// ===== PUBLIC ENDPOINTS =====

/**
 * Get all categories from catalog
 */
export const getAllCategories = async (): Promise<Category[]> => {
  return clone(MENU_CATEGORIES);
};

/**
 * Get full menu (alias of getAllCategories)
 */
export const getFullMenu = async (): Promise<Category[]> => {
  return clone(MENU_CATEGORIES);
};

/**
 * Get category by ID
 */
export const getCategoryById = async (id: string): Promise<Category> => {
  const category = MENU_CATEGORIES.find((c) => c.id === id);
  if (!category) {
    throw new Error(`Categoría no encontrada: ${id}`);
  }
  return clone(category);
};

/**
 * Get category by slug
 */
export const getCategoryBySlug = async (slug: string): Promise<Category> => {
  const category = MENU_CATEGORIES.find((c) => c.slug === slug);
  if (!category) {
    throw new Error(`Categoría no encontrada: ${slug}`);
  }
  return clone(category);
};

/**
 * Get items from a specific category
 */
export const getCategoryItems = async (categoryId: string): Promise<MenuItem[]> => {
  const category = await getCategoryById(categoryId);
  const items: MenuItem[] = [];
  category.subcategories.forEach((subcategory) => {
    if (subcategory.items) {items.push(...subcategory.items);}
    subcategory.subsections?.forEach((subsection) => items.push(...subsection.items));
  });
  return items;
};

/**
 * Search categories by term
 */
export const searchCategories = async (searchTerm: string): Promise<Category[]> => {
  const term = normalize(searchTerm);
  if (!term) {return [];}
  return clone(MENU_CATEGORIES.filter((c) => normalize(c.name).includes(term)));
};

/**
 * Search items by term (returns categories containing matching items)
 */
export const searchItems = async (searchTerm: string): Promise<Category[]> => {
  const term = normalize(searchTerm);
  if (!term) {return [];}

  const matchItem = (item: MenuItem) => normalize(item.name).includes(term);

  const result: Category[] = [];
  for (const category of MENU_CATEGORIES) {
    const subcategories = category.subcategories
      .map((subcategory) => {
        const directItems = (subcategory.items ?? []).filter(matchItem);
        const subsections = (subcategory.subsections ?? [])
          .map((subsection) => ({
            ...subsection,
            items: subsection.items.filter(matchItem),
          }))
          .filter((subsection) => subsection.items.length > 0);

        if (directItems.length === 0 && subsections.length === 0) {return null;}
        return { ...subcategory, items: directItems, subsections };
      })
      .filter((subcategory): subcategory is NonNullable<typeof subcategory> => subcategory !== null);

    if (subcategories.length > 0) {
      result.push(clone({ ...category, subcategories }));
    }
  }
  return result;
};

/**
 * Search specific item in a category
 */
export const searchItemInCategory = async (
  categoryId: string,
  itemName: string
): Promise<ItemSearchResult> => {
  const category = MENU_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) {
    throw new Error(`Categoría no encontrada: ${categoryId}`);
  }
  const target = normalize(itemName);

  for (const subcategory of category.subcategories) {
    const directItem = subcategory.items?.find((item) => normalize(item.name) === target);
    if (directItem) {
      return clone({ item: directItem, location: { subcategoryName: subcategory.name } });
    }
    for (const subsection of subcategory.subsections ?? []) {
      const subsectionItem = subsection.items.find((item) => normalize(item.name) === target);
      if (subsectionItem) {
        return clone({
          item: subsectionItem,
          location: { subcategoryName: subcategory.name, subsectionName: subsection.name },
        });
      }
    }
  }
  throw new Error(`Producto no encontrado: ${itemName}`);
};

// ===== ADMIN ENDPOINTS (deshabilitados) =====
// El panel de administración ha sido retirado y no existe backend. Estas
// funciones se conservan para mantener la firma del módulo, pero siempre fallan.

const adminDisabled = (): never => {
  throw new Error(BACKEND_DISABLED_MESSAGE);
};

export const createCategory = async (_data: CreateCategoryRequest): Promise<Category> =>
  adminDisabled();

export const updateCategory = async (
  _id: string,
  _data: UpdateCategoryRequest
): Promise<Category> => adminDisabled();

export const deleteCategory = async (_id: string): Promise<DeleteResponse> => adminDisabled();

export const addItem = async (_data: AddItemRequest, _imageFile?: File): Promise<Category> =>
  adminDisabled();

export const deleteItem = async (
  _categoryId: string,
  _itemName: string
): Promise<DeleteItemResponse> => adminDisabled();

export const updateItem = async (
  _data: UpdateItemRequest,
  _imageFile?: File
): Promise<Category> => adminDisabled();

export const updateSubcategoryName = async (
  _data: UpdateSubcategoryNameRequest
): Promise<Category> => adminDisabled();

export const updateSubsectionName = async (
  _data: UpdateSubsectionNameRequest
): Promise<Category> => adminDisabled();

// ===== UTILITY FUNCTIONS =====

/**
 * Find item by name in all categories
 */
export const findItemByName = async (itemName: string): Promise<ItemSearchResult | null> => {
  const target = normalize(itemName);
  if (!target) {return null;}

  for (const category of MENU_CATEGORIES) {
    for (const subcategory of category.subcategories) {
      const directItem = subcategory.items?.find((item) => normalize(item.name).includes(target));
      if (directItem) {
        return clone({ item: directItem, location: { subcategoryName: subcategory.name } });
      }
      for (const subsection of subcategory.subsections ?? []) {
        const subsectionItem = subsection.items.find((item) =>
          normalize(item.name).includes(target)
        );
        if (subsectionItem) {
          return clone({
            item: subsectionItem,
            location: { subcategoryName: subcategory.name, subsectionName: subsection.name },
          });
        }
      }
    }
  }
  return null;
};

/**
 * Get all items from all categories (flattened)
 */
export const getAllItems = async (): Promise<MenuItem[]> => {
  const allItems: MenuItem[] = [];

  MENU_CATEGORIES.forEach((category) => {
    category.subcategories.forEach((subcategory) => {
      if (subcategory.items) {
        allItems.push(...subcategory.items);
      }

      if (subcategory.subsections) {
        subcategory.subsections.forEach((subsection) => {
          allItems.push(...subsection.items);
        });
      }
    });
  });

  return clone(allItems);
};

/**
 * Get catalog statistics
 */
export const getCatalogStats = async (): Promise<CatalogStats> => {
  let totalSubcategories = 0;
  let totalItems = 0;
  let totalSubsections = 0;

  MENU_CATEGORIES.forEach((category) => {
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
    totalCategories: MENU_CATEGORIES.length,
    totalSubcategories,
    totalItems,
    totalSubsections,
  };
};

/**
 * Catalog service object
 */
export const CatalogService = {
  addItem,
  deleteItem,
  updateItem,
  updateSubcategoryName,
  updateSubsectionName,
};
