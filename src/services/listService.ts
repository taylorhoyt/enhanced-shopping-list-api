import { CreateListRequest } from "@/types";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class ListService {
  /**
   * Create a new shopping list with items
   * @param supabase - The Supabase client
   * @param name - The name of the list
   * @param items - Optional array of items that come from meals or standalone items
   * @returns The created list
   */
  async createList(
    supabase: SupabaseClient<Database>,
    list: CreateListRequest,
  ) {
    // First, create the shopping list to get the ID
    const { data: listData, error: listError } = await supabase
      .schema("base_schema")
      .from("shopping_list")
      .insert({ name: list.name })
      .select("id")
      .single();

    if (listError) throw listError;
    const listId = listData.id;

    // Create list items for meal items (with meal_id)
    if (list.items && list.items.length > 0) {
      const listItems = list.items.map(item => ({
        item_id: item.item_id,
        list_id: listId,
        quantity: item.quantity,
        unit: item.unit || null,
        meal_id: item.meal_id || null,
        meal_quantity: item.meal_quantity || null
      }));

      const { error: listItemsError } = await supabase
        .schema("base_schema")
        .from("list_item")
        .insert(listItems);

      if (listItemsError) throw listItemsError;
    }

    // Return the created list with items
    return await this.getListById(supabase, listId);
  }

  /**
   * Get all lists
   * @param supabase - The Supabase client
   * @returns All lists
   */
  async getAllLists(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("shopping_list")
      .select("id, name, created_at, updated_at, list_items:list_item(count)");

    if (error) throw error;
    return data;
  }

  /**
   * Get a list by id
   * @param supabase - The Supabase client
   * @param id - The id of the list
   * @returns The list
   */
  async getListById(supabase: SupabaseClient<Database>, id: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("shopping_list")
      .select("id, name, created_at, updated_at, list_items:list_item(count)")
      .eq("id", id);

    if (error) throw error;
    return data;
  }

  /**
   * Get the items for a list
   * @param supabase - The Supabase client
   * @param id - The id of the list
   * @returns The items for the list
   */
  async getListItems(supabase: SupabaseClient<Database>, id: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("list_item")
      .select("item:item(id, name, category), quantity, unit, is_purchased")
      .eq("list_id", id);

    if (error) throw error;
    return data;
  }

  /**
   * Get the meals for a list
   * @param supabase - The Supabase client
   * @param id - The id of the list
   * @returns The meals for the list
   */
  async getListMeals(supabase: SupabaseClient<Database>, id: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("list_item")
      .select("meal:meal(id, name)")
      .eq("list_id", id)
      .not("meal_id", "is", null);

    if (error) throw error;
    
    // Filter out duplicate meals based on meal id
    const uniqueMeals = data?.filter((item, index, self) => 
      index === self.findIndex(t => t.meal?.id === item.meal?.id)
    ) || [];
    
    return uniqueMeals;
  }

  
}
