import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class ListService {
  /**
   * Get all lists
   * @param supabase - The Supabase client
   * @returns All lists
   */
  async getAllLists(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("shopping_list")
      .select("id, name, created_at, updated_at");

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
      .select("id, name, created_at")
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
      .select("item:item(id, name, category), quantity, unit")
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
