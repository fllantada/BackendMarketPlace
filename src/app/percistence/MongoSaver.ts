import IPersistenceRepository from "../Interfaces/IPersistenceRepository";

export class MongoSaver implements IPersistenceRepository {
  private db: any;
  private collection: string;

  constructor(collection: string) {}

  async getAll(): Promise<any[]> {
    return [];
  }

  async getById(id: string): Promise<false | any> {
    return false;
  }
  create(item: any): string {
    return "OK";
  }
  async edit(id: string, item: any): Promise<any | false> {
    return false;
  }
  async delete(id: string): Promise<boolean> {
    return false;
  }
}
