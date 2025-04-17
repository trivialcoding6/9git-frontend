export type StorageRequest = {
  userId: string;
  categoryId: string;
};

export type Storage = {
  id: string;
  title: string;
};

export type CategoryWithStorages = {
  categoryId: string;
  categoryName: string;
  categoryColor?: string;
  storages: Storage[];
};
