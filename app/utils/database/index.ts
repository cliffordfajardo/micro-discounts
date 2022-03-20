import { SupabaseDB } from "./supabaseDB";
import { SQLiteDB } from "./sqliteDB";
import { type SQLDatabase } from "./database";

type DB_Type = "supabase" | "sqlite";

/**
 * @description
 * Determine which database to run given the environment variable. Ex: Supbabase or sqlite
 */
export function determineDbType(): DB_Type {
  const databaseType = (process.env.DB_TYPE || "").trim().toLowerCase();
  switch (databaseType) {
    case "supabase": {
      console.log("Database Type: supabase");
      return "supabase";
    }
    case "sqlite": {
      console.log("Database Type: sqlite");
      return "sqlite";
    }
    default:
      console.log("Database Type: supabase");
      return "supabase";
  }
}
export const DB_TYPE = determineDbType();

/**
 * @description
 * Get a database connection
 *
 * Use the DB_TYPE environment variable to switch between
 * SQLite or supabase database connections. Define
 * connection details in the ./database.json
 */
export async function getDb(): Promise<SQLDatabase> {
  const supabaseDB = new SupabaseDB();
  await supabaseDB.setup();
  return supabaseDB;
  // if (DB_TYPE === "supabase") {
  //   console.log("USING THE FOLLOWING DB: supabase");
  //   const supabaseDB = new SupabaseDB();
  //   const DB = await supabaseDB.setup()
  //   return DB;
  // } else {
  //   console.log("[utils.js] USING THE FOLLOWING DB: SQLITE");
  //   // const sqliteDB = new SQLiteDB();
  //   // return sqliteDB;
  // }
}

let db: SQLDatabase | null = null;
export async function getDbInstance(): Promise<SQLDatabase> {
  if (!db) {
    db = await getDb();
  }
  return db;
}
