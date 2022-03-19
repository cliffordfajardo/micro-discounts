import { createClient } from "@supabase/supabase-js";
import data from './discounts-02.json';
require("dotenv").config();

console.log('discounts-01.json', data);



(async() => {
  console.error("Note: This should only be run once. Please talk to domnguyen if you wanna run this script and comment line below to run");
  return;
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    console.error(
      `Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.\n` +
        `Please check that you have .env file created with the aforementioned supbase credentials.`,
    );
    process.exit(1);
  }

  const client = createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_SERVICE_KEY as string, {
    schema: "public",
  })

  data.forEach(async (row) => {
    const insert = await client.from('resources').insert(row);
    console.log(`inserted row(${row.title})`, insert);
  })
})()