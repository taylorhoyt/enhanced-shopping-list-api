import { createClient } from "@supabase/supabase-js";

export class ItemService {
  private supabaseUrl: string;
  private supabaseAnonKey: string;

  constructor() {
    this.supabaseUrl = process.env.SUPABASE_URL!;
    this.supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
  }

  async getAllItems(token: string) {
    const supabaseUser = createClient(this.supabaseUrl, this.supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data, error } = await supabaseUser
      .schema("base_schema")
      .from("item")
      .select("id, name, category, created_at, created_by");

    if (error) throw error;
    return data;
  }
}
