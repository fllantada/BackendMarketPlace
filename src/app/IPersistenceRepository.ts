export default interface IPersistenceRepository {
  getAll(fileName: string): any[];
  getById(fileName: string, id: string): Object | undefined;
  create(fileName: string, item: Object): string;
  edit(fileName: string, id: string, item: Object): Object | boolean;
  delete(fileName: string, id: string): boolean;
}
