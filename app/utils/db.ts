import { createClient } from "@supabase/supabase-js";

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

  export interface ResourceTable {
    id: number;
    inserted_at: string;
    title: string;
    description: string;
    category: string;
    tags: string[];
    url: string; 
    keyword: string[];
    tfa: string[];
}

export type DiscountTagTable = {
    id: number;
    inserted_at: string;
    tag: string;
}

export const fetchAllResources = async () => {
    return await supabase.from<ResourceTable>('resources').select('*');
}