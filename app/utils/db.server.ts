import { createClient } from "@supabase/supabase-js";
import { ResourceTable } from "~/types/dbTypes";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error("Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables");
    process.exit(1);
}

export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY, {
    schema: 'public',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  });

export const fetchAllResources = async () => {
    return await supabase.from<ResourceTable>('resources').select('*');
}