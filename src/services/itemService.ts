import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class ItemService {
  async getAllItems(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("item")
      .select("id, name, category, created_at, created_by");

    if (error) throw error;
    return data;
  }
}
