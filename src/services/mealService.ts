import { CreateMealRequest } from "@/types";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class MealService {
  /**
   * Get all meals
   * @param supabase - The Supabase client
   * @returns All meals
   */
  async getAllMeals(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal")
      .select("id, name, created_at, updated_at");

    if (error) throw error;
    return data;
  }

  /**
   * Get a meal by id
   * @param supabase - The Supabase client
   * @param id - The id of the meal
   * @returns The meal
   */
  async getMealById(supabase: SupabaseClient<Database>, id: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal")
      .select("id, name, created_at, updated_at")
      .eq("id", id);

    if (error) throw error;
    return data;
  }

  /**
   * Get the items for a meal
   * @param supabase - The Supabase client
   * @param id - The id of the meal
   * @returns The items for the meal
   */
  async getMealItems(supabase: SupabaseClient<Database>, id: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal_item")
      .select("item:item(id, name, category), quantity, unit")
      .eq("meal_id", id);

    if (error) throw error;
    return data;
  }

  /**
   * Create a meal
   * @param supabase - The Supabase client
   * @param meal - The meal to create
   * @returns The created meal
   */
  async createMeal(supabase: SupabaseClient<Database>, meal: CreateMealRequest) {
    
    const { data: mealData, error: mealError } = await supabase
      .schema("base_schema")
      .from("meal")
      .insert({
        name: meal.name,
      })
      .select("id, name, created_at, updated_at")
      .single();

    if (mealError) throw mealError;

    if (meal.items && meal.items.length > 0) {
      const mealItemsToInsert = meal.items.map(item => ({
        meal_id: mealData.id,
        item_id: item.item_id,
        quantity: item.quantity,
        unit: item.unit || null,
      }));

      const { error: itemsError } = await supabase
        .schema("base_schema")
        .from("meal_item")
        .insert(mealItemsToInsert);

      if (itemsError) throw itemsError;
    }

    return mealData;
  }
}
