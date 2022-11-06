type findedObject = {
  [key: string]: any;
};

export default interface IPersistenceRepository {
  getAll(): Promise<any[]>;
  getById(id: string): Promise<findedObject> | undefined;
  create(item: Object): string;
  edit(id: string, item: Object): Object | boolean;
  delete(id: string): boolean;
}
