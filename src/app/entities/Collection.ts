export interface Collection {
  id: string;
  title: string;
  description: string;
  contentIds?: string[] | null;
  published: boolean;
  pinned: boolean;
}
