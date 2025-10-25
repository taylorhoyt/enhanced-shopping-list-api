import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import dotenv from "dotenv";

dotenv.config();

const supabaseConnection = () => {
  if (process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY) {
    return createClient<Database>(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PUBLISHABLE_KEY,
    );
  } else {
    throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required");
  }
};

export { supabaseConnection };
