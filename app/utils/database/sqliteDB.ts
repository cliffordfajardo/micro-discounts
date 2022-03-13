// TODO install sqlite
import { ResourceTable } from "~/types/dbTypes";

if (!process.env.IS_SQLITE_ENABLED) {
  console.error(
    `Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables.\n` +
      `Please check that you have .env file created with the aforementioned supbase credentials.`,
  );
  process.exit(1);
}

export class SQLiteDB {
  private db: any;
  constructor() {}

  public async setup(): Promise<any> {
    // TODO
  }

  public async fetchAllResources(): Promise<any> {
    // TODO
  }
}
