import IPersistenceRepository from "./Interfaces/IPersistenceRepository";
import knex, { Knex } from "knex";
import { FileSaverObject } from "./Interfaces/IFileSaverObject";

type KnexConfig = {
  client: string;
  connection: {
    filename: string;
  };
  usenNullAsDefault: boolean;
};

const defaultOptions = {
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite",
  },
  useNullAsDefault: true,
};

export class DbSaver implements IPersistenceRepository {
  private db: Knex;
  private collection: string;

  constructor(collection: string) {
    this.db = knex(defaultOptions);
    this.collection = collection;
  }

  async getAll(): Promise<FileSaverObject[]> {
    const items: FileSaverObject[] = await this.db
      .select("*")
      .from(this.collection);
    return items;
  }

  async getById(id: string): Promise<false | FileSaverObject> {
    const item: FileSaverObject[] = await this.db
      .select("*")
      .from(this.collection)
      .where("id", id);

    if (item.length === 0) {
      return false;
    }
    return item[0];
  }
  create(item: FileSaverObject): string {
    const id = this.db(this.collection).insert(item);
    return "OK";
  }
  async edit(
    id: string,
    item: FileSaverObject
  ): Promise<FileSaverObject | false> {
    const itemToEdit: FileSaverObject[] = await this.db
      .select("*")
      .from(this.collection)
      .where("id", id);
    if (itemToEdit.length === 0) {
      return false;
    }
    const itemEdited = await this.db(this.collection)
      .where("id", id)
      .update(item);
    return item;
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.db.from(this.collection).where("id", id).del();
    if (result === 0) {
      return false;
    }
    return true;
  }
}
