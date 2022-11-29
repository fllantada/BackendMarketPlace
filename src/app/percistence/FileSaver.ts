import IPersistenceRepository from "../Interfaces/IPersistenceRepository";
import * as fs from "fs/promises";
import { FileSaverObject as fileSaverObject } from "../Interfaces/IFileSaverObject";

/*  */
export class FileSaver implements IPersistenceRepository {
  private path: string;
  private data: fileSaverObject[] = [];

  constructor(fileName: string, fileFolder: string) {
    this.initialize(fileName, fileFolder);
  }
  async initialize(fileName: string, fileFolder: string) {
    this.createPath(fileName, fileFolder);
    await this.createFolder(fileFolder);
    await this.createFile();
    await this.readFile();
  }
  getAll(): fileSaverObject[] {
    this.readFile();
    return this.data;
  }
  async readFile(): Promise<void> {
    const data = await fs.readFile(this.path);
    this.data = JSON.parse(data.toString());
  }
  async writeFile() {
    await fs.writeFile(this.path, JSON.stringify(this.data, null, 2));
  }
  async getById(id: string): Promise<fileSaverObject | false> {
    const data = this.getAll() as fileSaverObject[];
    const findedObject = data.find((item) => item.id === id);
    if (findedObject) {
      return findedObject;
    } else {
      return false;
    }
  }
  create(item: fileSaverObject): string {
    this.data.push(item);
    this.writeFile();
    return "ok";
  }
  edit(id: string, newItem: Object): Object | boolean {
    const findedObject = this.data.find((item) => item.id === id);

    if (findedObject) {
      const index = this.data.indexOf(findedObject);
      this.data[index] = newItem as fileSaverObject;
      this.writeFile();
      return newItem;
    } else {
      return false;
    }
  }
  delete(id: string): boolean {
    const findedObject = this.data.find((item) => item.id === id);
    if (findedObject) {
      const index = this.data.indexOf(findedObject);
      this.data.splice(index, 1);
      this.writeFile();
      return true;
    } else {
      return false;
    }
  }

  createPath(filename: string, fileFolder: string) {
    this.path = `${__dirname}/${fileFolder}/${filename}.json`;
  }
  async createFile() {
    try {
      await fs.access(this.path);
    } catch (error) {
      fs.writeFile(this.path, JSON.stringify(this.data));
    }
  }
  async createFolder(fileFolder: string) {
    try {
      await fs.access(`${__dirname}/${fileFolder}`);
    } catch (error) {
      await fs.mkdir(`${__dirname}/${fileFolder}`);
    }
  }
}
