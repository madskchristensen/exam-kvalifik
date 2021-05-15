export interface Post {
  title: string;
  text: string;
  published: boolean;
  pinned: boolean;
  mediaType?: string | null;
  mediaRef?: string | null;
}
