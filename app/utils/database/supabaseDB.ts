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

const DB_REFRESH_INTERVAL_MS = process.env.DB_REFRESH_INTERVAL_MS
  ? parseInt(process.env.DB_REFRESH_INTERVAL_MS)
  : 1000 * 10;

export class SupabaseDB extends SQLDatabase {
  // @ts-ignore
  public db: SupabaseClient;

  private resourceTableCache: ResourceTable[] | null = null;

  private lastFetch: number = Date.now();

  public async setup(): Promise<SQLDatabase> {
    const supabase = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_KEY as string, {
      schema: "public",
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    });
    this.db = supabase;
    this.lastFetch = Date.now();
    console.log("NEW DB IS CREATED");
    return this;
  }

  public async fetchAllResourcesCached(): Promise<ResourceTable[]> {
    if (!this.resourceTableCache || Date.now() - this.lastFetch > DB_REFRESH_INTERVAL_MS) {
      console.warn("Refetching resource table cache", {
        lastFetch: this.lastFetch,
        now: Date.now(),
        diff: Date.now() - this.lastFetch,
        DB_REFRESH_INTERVAL_MS,
      });
      this.resourceTableCache = (await this.db.from<ResourceTable>("resources").select("*")).data;
      this.lastFetch = Date.now();
    }
    return this.resourceTableCache as any;
  }
}
