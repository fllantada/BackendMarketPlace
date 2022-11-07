import IPersistenceRepository from "./IPersistenceRepository";
import * as fs from "fs/promises";

type fileSaverObject = {
  id: string;
  [key: string]: any;
};

export class FileSaver implements IPersistenceRepository {
  private path: string;
  private data: fileSaverObject[] = [];
  constructor(fileName: string, fileFolder: string) {
    console.log("Inicio el constructor de fileSaver");
    this.initialize(fileName, fileFolder);
  }
  async initialize(fileName: string, fileFolder: string) {
    this.createPath(fileName, fileFolder);
    await this.createFolder(fileFolder);
    await this.createFile();
    this.readFile();
  }
  getAll(): fileSaverObject[] {
    console.log("FileSaver:GetAll:Inicie GET ALL");
    this.readFile();
    return this.data;
  }
  async readFile(): Promise<void> {
    const data = await fs.readFile(this.path);
    this.data = JSON.parse(data.toString());
  }

  async getById(id: string): Promise<Object> {
    const data = this.getAll() as fileSaverObject[];
    const findedObject = data.find((item) => item.id === id);
    if (findedObject) {
      return findedObject;
    } else {
      return {};
    }
  }
  create(item: fileSaverObject): string {
    this.data.push(item);
    fs.writeFile(this.path, JSON.stringify(this.data));
    return "ok";
  }
  edit(id: string, item: Object): Object | boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: string): boolean {
    throw new Error("Method not implemented.");
  }

  createPath(filename: string, fileFolder: string) {
    this.path = `${__dirname}/${fileFolder}/${filename}.json`;
  }
  async createFile() {
    try {
      await fs.access(this.path);
      console.log("Existe el archivo");
    } catch (error) {
      console.log("No existe el archivo");
      fs.writeFile(this.path, JSON.stringify(this.data));
    }
  }
  async createFolder(fileFolder: string) {
    //folder exist
    try {
      await fs.access(`${__dirname}/${fileFolder}`);
    } catch (error) {
      //folder does not exist
      await fs.mkdir(`${__dirname}/${fileFolder}`);
    }
  }
}
