import { SQLDatabase } from "./database";

export class SupabaseDB extends SQLDatabase {
  private db: any;
  protected constructor(db: any) {
    super();
    this.db = db;
  }

  public static async setup(): Promise<any> {}
  // public async shutdown(_attemptNumber: number = 0): Promise<void> { }
}
