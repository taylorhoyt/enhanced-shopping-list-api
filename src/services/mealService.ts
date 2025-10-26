import { CreateMealRequest, AddItemToMealRequest, UpdateItemQuantityRequest } from "@/types";
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

  /**
   * Update a meal name
   * @param supabase - The Supabase client
   * @param mealId - The id of the meal
   * @param name - The new name for the meal
   * @returns The updated meal
   */
  async updateMealName(supabase: SupabaseClient<Database>, mealId: string, name: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal")
      .update({ name, updated_at: new Date().toISOString() })
      .eq("id", mealId)
      .select("id, name, created_at, updated_at")
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Add an item to a meal
   * @param supabase - The Supabase client
   * @param mealId - The id of the meal
   * @param item - The item to add
   * @returns The created meal item
   */
  async addItemToMeal(
    supabase: SupabaseClient<Database>,
    mealId: string,
    item: AddItemToMealRequest,
  ) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal_item")
      .insert({
        meal_id: mealId,
        item_id: item.item_id,
        quantity: item.quantity,
        unit: item.unit || null,
      })
      .select("item_id, meal_id, quantity, unit")
      .single();

    // update the meal updated_at
    const { error: mealError } = await supabase
      .schema("base_schema")
      .from("meal")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", mealId);

    if (mealError) throw mealError;

    if (error) throw error;
    return data;
  }

  /**
   * Remove an item from a meal
   * @param supabase - The Supabase client
   * @param mealId - The id of the meal
   * @param itemId - The id of the item to remove
   * @returns { success: true } if the item was removed
   */
  async removeItemFromMeal(supabase: SupabaseClient<Database>, mealId: string, itemId: string) {
    const { error } = await supabase
      .schema("base_schema")
      .from("meal_item")
      .delete()
      .eq("meal_id", mealId)
      .eq("item_id", itemId);

    // update the meal updated_at
    const { error: mealError } = await supabase
      .schema("base_schema")
      .from("meal")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", mealId);

    if (mealError) throw mealError;

    if (error) throw error;
    return { success: true };
  }

  /**
   * Update a meal item's quantity and/or unit
   * @param supabase - The Supabase client
   * @param mealId - The id of the meal
   * @param itemId - The id of the item
   * @param update - The quantity and/or unit to update
   * @returns The updated meal item
   */
  async updateMealItem(
    supabase: SupabaseClient<Database>,
    mealId: string,
    itemId: string,
    update: UpdateItemQuantityRequest
  ) {
    const updateData: { quantity?: number; unit?: string | null } = {
      quantity: update.quantity,
    };

    if (update.unit !== undefined) {
      updateData.unit = update.unit || null;
    }

    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal_item")
      .update(updateData)
      .eq("meal_id", mealId)
      .eq("item_id", itemId)
      .select("item_id, meal_id, quantity, unit")
      .single();

    // update the meal updated_at
    const { error: mealError } = await supabase
      .schema("base_schema")
      .from("meal")
      .update({ updated_at: new Date().toISOString() })
      .eq("id", mealId);

    if (mealError) throw mealError;

    if (error) throw error;
    return data;
  }

  /**
   * Delete a meal
   * @param supabase - The Supabase client
   * @param id - The id of the meal
   * @returns { success: true } if the meal was deleted
   */
  async deleteMeal(supabase: SupabaseClient<Database>, id: string) {
    const { error } = await supabase
      .schema("base_schema")
      .from("meal")
      .delete()
      .eq("id", id);

    if (error) throw error;
    return { success: true };
  }
}
