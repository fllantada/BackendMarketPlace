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
  }
  async getAll(): Promise<fileSaverObject[]> {
    console.log("Inicie GET ALL");
    fs.readFile(this.path, "utf-8")
      .then((data) => {
        console.log("Estoy en la primesa del read File");
        this.data = JSON.parse(data) as fileSaverObject[];
        return this.data;
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("Estoy por retornar this.data", this.data);
    return this.data;
  }

  async getById(id: string): Promise<Object> {
    console.log("Desde fileSaver, id es", id);
    const data = (await this.getAll()) as fileSaverObject[];
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
      console.log("Existe la carpeta");
    } catch (error) {
      //folder does not exist
      await fs.mkdir(`${__dirname}/${fileFolder}`);
      console.log("No existe la carpeta");
    }
  }
}
