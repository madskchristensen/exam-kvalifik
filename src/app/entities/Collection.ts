export interface Collection {
  id?: string;
  title: string;
  createdAt: string;
  description: string;
  posts?: string[] | null;
  events?: string[];
  published: boolean;
  pinned: boolean;
}
