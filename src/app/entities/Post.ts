export interface Post {
  id: string;
  title: string;
  text: string;
  published: boolean;
  pinned: boolean;
  createdAt: string;
  mediaType?: string | null;
  mediaRef?: string | null;
}
