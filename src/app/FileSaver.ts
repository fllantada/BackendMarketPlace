import IPersistenceRepository from "./IPersistenceRepository";

export class FileSaver implements IPersistenceRepository {
  getAll(fileName: string): Object[] {
    throw new Error("Method not implemented.");
  }
  getById(fileName: string, id: string): Object | undefined {
    throw new Error("Method not implemented.");
  }
  create(fileName: string, item: Object): string {
    throw new Error("Method not implemented.");
  }
  edit(fileName: string, id: string, item: Object): Object | boolean {
    throw new Error("Method not implemented.");
  }
  delete(fileName: string, id: string): boolean {
    throw new Error("Method not implemented.");
  }
}
