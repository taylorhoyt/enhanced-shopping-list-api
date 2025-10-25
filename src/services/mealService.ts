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
}
