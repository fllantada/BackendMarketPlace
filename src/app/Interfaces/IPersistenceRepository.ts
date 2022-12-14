type findedObject = {
  [key: string]: any;
};

export default interface IPersistenceRepository {
  getAll(): findedObject[] | Promise<findedObject[]>;
  getById(id: string): Promise<findedObject | false>;
  create(item: Object): string;
  edit(id: string, item: Object): Object | boolean;
  delete(id: string): boolean | Promise<boolean>;
}
