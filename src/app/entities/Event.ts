export interface Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  published: boolean;
  pinned: boolean;
  schedule?: Map<string, string> | null;
  location?: string | null;
}
