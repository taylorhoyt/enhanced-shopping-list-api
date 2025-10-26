import { CreateItemRequest, UpdateItemRequest } from "@/types";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class ItemService {
  /**
   * Get all items
   * @param supabase - The Supabase client
   * @returns All items
   */
  async getAllItems(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("item")
      .select("id, name, category, created_at");

    if (error) throw error;
    return data;
  }

  /**
   * Get an item by id
   * @param supabase - The Supabase client
   * @param id - The id of the item
   * @returns The item
   */
  async getItemById(supabase: SupabaseClient<Database>, id: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("item")
      .select("id, name, category, created_at")
      .eq("id", id);

    if (error) throw error;
    return data;
  }

  /**
   * Get items by category
   * @param supabase - The Supabase client
   * @param category - The category of the items
   * @returns The items
   */
  async getItemsByCategory(supabase: SupabaseClient<Database>, category: string) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("item")
      .select("id, name, category, created_at")
      .eq("category", category);

    if (error) throw error;
    return data;
  }

  /**
   * Create an item
   * @param supabase - The Supabase client
   * @param item - The item to create
   * @returns The created item
   */
  async createItem(supabase: SupabaseClient<Database>, item: CreateItemRequest) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("item")
      .insert({
        name: item.name,
        category: item.category,
      })
      .select("id, name, category, created_at")
      .single();

    if (error) throw error;
    return data;
  }

  /**
   * Update an item
   * @param supabase - The Supabase client
   * @param id - The id of the item
   * @param item - The item to update
   * @returns The updated item
   */
  async updateItem(supabase: SupabaseClient<Database>, id: string, item: UpdateItemRequest) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("item")
      .update(item)
      .eq("id", id)
      .select("id, name, category, created_at")
      .single();
      
    if (error) throw error;
    return data;
  }
}
  