// Database types
export interface Item {
  id: string; // UUID
  name: string;
  category: string;
  created_at: Date;
  created_by: string; // UUID
}

export interface Meal {
  id: string; // UUID
  name: string;
  created_at: Date;
  updated_at: Date | null;
  created_by: string; // UUID
}

export interface MealWithItems extends Meal {
  items: MealItem[];
}

export interface MealItem {
  id: string; // UUID (item id)
  name: string;
  category: string;
  quantity: number;
  unit?: string;
}

export interface ShoppingList {
  id: string; // UUID
  name: string;
  created_at: Date;
  updated_at: Date | null;
  created_by: string; // UUID
}

export interface ShoppingListWithItems extends ShoppingList {
  items: ListItem[];
}

export interface ListItem {
  id: string; // UUID
  item_id: string; // UUID
  list_id: string; // UUID
  item_name: string;
  category: string;
  quantity: number;
  unit?: string;
  is_purchased: boolean;
  meal_id?: string; // UUID
  meal_quantity?: number;
  meal_name?: string;
  added_by: string; // UUID
}

export interface MealItemRelation {
  item_id: string; // UUID
  meal_id: string; // UUID
  quantity: number;
  unit?: string;
  added_by: string; // UUID
}

export interface ListItemRelation {
  item_id: string; // UUID
  list_id: string; // UUID
  quantity: number;
  unit?: string;
  meal_id?: string; // UUID
  meal_quantity?: number;
  added_by: string; // UUID
}

// Request/Response types
export interface CreateItemRequest {
  name: string;
  category: string;
}

export interface UpdateItemRequest {
  name?: string;
  category?: string;
}

export interface CreateMealRequest {
  name: string;
  items: {
    item_id: string; // UUID
    quantity: number;
    unit?: string;
  }[];
}

export interface UpdateMealRequest {
  name?: string;
  items?: {
    item_id: string; // UUID
    quantity: number;
    unit?: string;
  }[];
}

export interface AddItemToMealRequest {
  item_id: string; // UUID
  quantity: number;
  unit?: string;
}

export interface UpdateItemQuantityRequest {
  quantity: number;
  unit?: string;
}

export interface CreateListRequest {
  name: string;
  items?: {
    item_id: string; // UUID
    quantity: number;
    unit?: string;
    meal_id?: string; // UUID
    meal_quantity?: number;
  }[];
}

export interface UpdateListRequest {
  name: string;
}

export interface AddMealToListRequest {
  meal_id: string; // UUID
}

export interface AddItemToListRequest {
  item_id: string; // UUID
  quantity: number;
  unit?: string;
  meal_id?: string; // UUID
  meal_quantity?: number;
}

export interface UpdatePurchaseStateRequest {
  is_purchased: boolean;
}

// Summary types
export interface MealSummary {
  id: string; // UUID
  name: string;
  created_at: Date;
  updated_at: Date | null;
  total_items: number;
  total_quantity: number;
}

export interface ListSummary {
  id: string; // UUID
  name: string;
  created_at: Date;
  updated_at: Date | null;
  total_items: number;
  purchased_items: number;
  remaining_items: number;
}

// Query parameters
export interface ItemQueryParams {
  category?: string;
  user_id?: string; // UUID
  q?: string;
}

export interface MealQueryParams {
  user_id?: string; // UUID
  include_items?: string;
}

export interface ListQueryParams {
  user_id?: string; // UUID
  include_items?: string;
  limit?: string;
}
