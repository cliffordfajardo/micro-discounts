import { PostgrestResponse } from "@supabase/supabase-js";
import { ResourceTable } from "~/types/dbTypes";

export interface SQLPreparedStatement {
  get<T = any>(...params: any[]): Promise<T>;
  all<T = any>(...params: any[]): Promise<T[]>;
}

export abstract class SQLDatabase {
  /**
   * Asynchronously create a new database connection
   */
  public async setup(): Promise<SQLDatabase> {
    return Promise.reject("Not yet implemented");
  }

  public async fetchAllResourcesCached(): Promise<ResourceTable[]> {
    return Promise.reject("Not yet implemented");
  }
}
