export interface Collection {
  id?: string;
  title: string;
  createdAt: string;
  description: string;
  contentIds?: string[] | null;
  published: boolean;
  pinned: boolean;
}
