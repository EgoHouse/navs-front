import {
    Wheat,
    Nut,
    Milk,
    Egg,
    Fish,
    Bean,
    Flower2,
    Droplets,
    Cherry,
    type LucideIcon,
} from 'lucide-react';

export interface Allergen {
    icon: LucideIcon;
    name: string;
}

/**
 * Allergens used in the menu (only those referenced by at least one item)
 */
export const ALLERGENS: Allergen[] = [
    { icon: Wheat, name: 'Gluten' },
    { icon: Milk, name: 'Lácteos' },
    { icon: Egg, name: 'Huevo' },
    { icon: Fish, name: 'Pescado' },
    { icon: Nut, name: 'Frutos de cáscara' },
    { icon: Bean, name: 'Soja' },
    { icon: Flower2, name: 'Sésamo' },
    { icon: Droplets, name: 'Sulfitos' },
    { icon: Cherry, name: 'Mostaza' },
];

/** Map allergen name → icon for quick lookup */
export const ALLERGEN_ICON_MAP: Record<string, LucideIcon> = Object.fromEntries(
    ALLERGENS.map((a) => [a.name, a.icon])
);

/**
 * Item name → list of allergen names
 * Names are matched case-insensitively and trimmed in the lookup function.
 */
export const ITEM_ALLERGENS: Record<string, string[]> = {
    'Bacon cheese fries': ['Lácteos'],
    'Fingers': ['Gluten', 'Mostaza', 'Huevo'],
    'Tequeños': ['Gluten', 'Lácteos'],
    'Croquetas de jamón': ['Gluten', 'Lácteos', 'Huevo'],
    'Quesadillas': ['Gluten', 'Lácteos'],
    'Alitas tailandesas': ['Sulfitos'],
    'Ensalada de burrata con tomate': ['Lácteos', 'Frutos de cáscara'],
    'Ensalada Cesar': ['Gluten', 'Lácteos', 'Huevo', 'Pescado'],
    'Cheese burger': ['Gluten', 'Lácteos', 'Huevo'],
    'Lady BBQ': ['Gluten', 'Sulfitos'],
    'Egocentrica': ['Gluten', 'Huevo'],
    'Club sandwich': ['Gluten', 'Lácteos', 'Huevo'],
    'Entrecot': [],
    'Poke de pollo': ['Gluten', 'Soja', 'Sésamo'],
    'Poke de salmon': ['Pescado', 'Gluten', 'Soja', 'Sésamo'],
    'Brownie': ['Gluten', 'Huevo', 'Lácteos', 'Frutos de cáscara'],
    'Coulant': ['Gluten', 'Huevo', 'Lácteos'],
    'Rosé de minuit': ['Sulfitos'],
};

/** Case-insensitive lookup index built once */
const ITEM_ALLERGENS_LOWER: Record<string, string[]> = Object.fromEntries(
    Object.entries(ITEM_ALLERGENS).map(([k, v]) => [k.toLowerCase().trim(), v])
);

/**
 * Get allergen names for a given item name (case-insensitive)
 */
export const getAllergensForItem = (itemName: string): string[] =>
    ITEM_ALLERGENS_LOWER[itemName.toLowerCase().trim()] ?? [];
