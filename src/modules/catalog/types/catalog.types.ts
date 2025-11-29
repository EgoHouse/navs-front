// ===== MENU ITEM TYPES =====

export interface MenuVariant {
  size: string;
  price: number;
}

export interface MenuItem {
  name: string;
  price?: number;
  variants?: MenuVariant[];
  description?: string;
  tagline?: string;
  notes?: string;
  imageUrl?: string;
}

// ===== MENU STRUCTURE TYPES =====

export interface MenuSubsection {
  name: string;
  items: MenuItem[];
}

export interface MenuSubcategory {
  name: string;
  type?: 'signature' | 'regular';
  items?: MenuItem[];
  subsections?: MenuSubsection[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: MenuSubcategory[];
  createdAt: string;
  updatedAt: string;
}

// ===== SEARCH TYPES =====

export interface ItemLocation {
  subcategoryName: string;
  subsectionName?: string;
}

export interface ItemSearchResult {
  item: MenuItem;
  location: ItemLocation;
}

// ===== STATS TYPES =====

export interface CatalogStats {
  totalCategories: number;
  totalSubcategories: number;
  totalItems: number;
  totalSubsections: number;
}

// ===== REQUEST TYPES (Admin) =====

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  subcategories?: MenuSubcategory[];
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}

export interface AddItemRequest {
  categoryId: string;
  subcategoryName: string;
  subsectionName?: string;
  item: MenuItem;
}

export interface UpdateItemRequest {
  categoryId: string;
  subcategoryName: string;
  subsectionName?: string;
  itemName: string;
  itemData: Partial<MenuItem>;
}

export interface UpdateSubcategoryNameRequest {
  categoryId: string;
  oldName: string;
  newName: string;
}

export interface UpdateSubsectionNameRequest {
  categoryId: string;
  subcategoryName: string;
  oldName: string;
  newName: string;
}

// ===== RESPONSE TYPES =====

export interface DeleteResponse {
  message: string;
  id: string;
}

export interface DeleteItemResponse {
  message: string;
  categoryId: string;
  itemName: string;
}
