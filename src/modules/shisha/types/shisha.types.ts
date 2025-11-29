import type { LucideIcon } from 'lucide-react';

/**
 * Quiz state - represents the current state of the shisha customization quiz
 */
export interface QuizState {
  tobaccoType: string;
  flavors: FlavorSelection[];
  currentStep: number;
}

/**
 * Flavor selection - represents a selected flavor with main and optional sub-flavor
 */
export interface FlavorSelection {
  main: string;
  sub?: string;
}

/**
 * Tobacco type definition
 */
export interface TobaccoType {
  id: string;
  name: string;
  displayName: string;
  description: string;
  icon: 'coffee' | 'sparkles' | 'leaf';
}

/**
 * Flavor type definition
 */
export interface FlavorType {
  id: string;
  name: string;
  subs: string[];
  info: string;
}

/**
 * Icon map for tobacco types
 */
export interface IconMap {
  coffee: LucideIcon;
  sparkles: LucideIcon;
  leaf: LucideIcon;
}
