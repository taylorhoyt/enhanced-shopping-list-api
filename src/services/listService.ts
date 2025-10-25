import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class ListService {
  async getAllLists(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("shopping_list")
      .select("id, name, created_at, created_by");

    if (error) throw error;
    return data;
  }
}
