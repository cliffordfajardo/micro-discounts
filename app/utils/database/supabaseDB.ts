import { createClient, PostgrestResponse } from "@supabase/supabase-js";
import { type SupabaseClient } from "@supabase/supabase-js";
import { ResourceTable } from "~/types/dbTypes";
import { SQLDatabase } from "./database";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error(
    `Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.\n` +
      `Please check that you have .env file created with the aforementioned supbase credentials.`,
  );
  process.exit(1);
}

export class SupabaseDB extends SQLDatabase {
  // @ts-ignore
  private db: SupabaseClient;

  constructor() {
    super();
  }

  public async setup(): Promise<SQLDatabase> {
    const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_KEY as string, {
      schema: "public",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    });
    this.db = supabase;
    return this;
  }

  public async fetchAllResources(): Promise<PostgrestResponse<ResourceTable>> {
    const response = this.db.from<ResourceTable>("resources").select("*");
    return response;
  }
}
