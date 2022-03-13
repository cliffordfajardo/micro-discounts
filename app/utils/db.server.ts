import { createClient } from "@supabase/supabase-js";
import { ResourceTable } from "~/types/dbTypes";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
  console.error(
    `Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.\n` +
    `Please check that you have .env file created with the aforementioned supbase credentials.`
  );
  process.exit(1);
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
  {
    schema: "public",
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  }
);

/**
 * @description
 * Fetches all items from our database table.
 */
export const fetchAllResources = async () => {
  return await supabase.from<ResourceTable>("resources").select("*");
};

/**
 * @description
 * TODO: add types fro category
 */
export const fetchResourceByCategoryOrTag = async (category='', tag='') => {
  let query = supabase.from<ResourceTable>("resources").select("*")

  const hasCategoryFilter = category.length >= 3;
  const hasTagFilter = category.length >= 3;

  if(hasCategoryFilter) {
    query = query.filter('category', 'eq', category)
  }
  // if(hasTagFilter){
  //   query = query.filter('tag', 'eq', tag)
  // }
  const results = await query;
  return results;
}
