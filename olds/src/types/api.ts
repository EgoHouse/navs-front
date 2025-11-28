// ===== TIPOS DE USUARIO Y AUTENTICACIÓN =====

export interface User {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  address?: string;
  role: 'USER' | 'ADMIN';
  createdAt?: string;
  updatedAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address?: string;
  role?: 'USER' | 'ADMIN';
}

export interface AuthResponse {
  user: User;
  access_token: string;
}

export interface DashboardResponse {
  message: string;
  user: User;
  dashboardData: string;
}

export interface AdminUsersResponse {
  message: string;
  requestedBy: User;
  data: string;
}

// ===== TIPOS DE CATÁLOGO/MENÚ =====

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

export interface MenuSubsection {
  name: string;
  items: MenuItem[];
}

export interface MenuSubcategory {
  name: string;
  type?: string;
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

export interface ItemLocation {
  subcategoryName: string;
  subsectionName?: string;
}

export interface ItemSearchResult {
  item: MenuItem;
  location: ItemLocation;
}

// ===== REQUESTS PARA CREAR/ACTUALIZAR =====

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

// ===== REQUESTS PARA EDICIÓN =====

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

// ===== RESPONSES GENERALES =====

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface DeleteResponse {
  message: string;
  id: string;
}

export interface DeleteItemResponse {
  message: string;
  categoryId: string;
  itemName: string;
}

// ===== TIPOS DE BÚSQUEDA =====

export interface SearchQuery {
  q: string;
}

// ===== TIPOS PARA REQUESTS HTTP =====

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}