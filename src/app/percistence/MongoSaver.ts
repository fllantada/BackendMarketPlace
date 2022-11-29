import IPersistenceRepository from "../Interfaces/IPersistenceRepository";
import * as mongoDb from "mongodb";
import { FileSaverObject } from "../Interfaces/IFileSaverObject";

export default class MongoSaver implements IPersistenceRepository {
  private db: mongoDb.Db;
  private client: mongoDb.MongoClient;
  private collection: mongoDb.Collection;
  private collectionName: string;

  constructor(
    collectionName: string,
    url: string = "mongodb://localhost:27017"
  ) {
    this.collectionName = collectionName;
    this.client = new mongoDb.MongoClient(url, {});

    this.connect();
  }
  async connect() {
    if (this.db) {
      return;
    }
    await this.client.connect();
    const dbName = "myproject";
    this.db = this.client.db(dbName);
    this.collection = this.db.collection(this.collectionName);
    console.log(this.collection);
  }

  disconnect() {
    this.client.close();
  }

  async getAll(): Promise<FileSaverObject[]> {
    const items = await this.collection.find({}).toArray();
    return items.map((item: any) => ({ id: item._id, ...item }));
  }

  async getById(id: string): Promise<false | any> {
    const item = await this.collection.find({ _id: id }).toArray();
    if (item.length === 0) {
      return false;
    }
    return item[0];
  }
  create(item: any): string {
    const id = this.collection.insertOne(item);
    return "OK";
  }
  async edit(id: string, item: any): Promise<any | false> {
    const itemToEdit = await this.collection.find({ _id: id }).toArray();
    if (itemToEdit.length === 0) {
      return false;
    }
    return itemToEdit[0];
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ _id: id });
    return result.deletedCount === 1;
  }
}
