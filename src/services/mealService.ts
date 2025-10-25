import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export class MealService {
  async getAllMeals(supabase: SupabaseClient<Database>) {
    const { data, error } = await supabase
      .schema("base_schema")
      .from("meal")
      .select("id, name, created_at, updated_at, created_by");

    if (error) throw error;
    return data;
  }
}
