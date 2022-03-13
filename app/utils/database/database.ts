export interface SQLPreparedStatement {
  get<T = any>(...params: any[]): Promise<T>;
  all<T = any>(...params: any[]): Promise<T[]>;
}

export abstract class SQLDatabase {
  /**
   * Asynchronously create a new database connection
   */
  public static async setup(): Promise<SQLDatabase> {
    return Promise.reject("Not yet implemented");
  }
}
