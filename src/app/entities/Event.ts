export interface Event {
  id?: string;
  title: string;
  startDate: Date;
  startTime: string;
  endDate: Date;
  endTime: string;
  description: string;
  published: boolean;
  pinned: boolean;
  schedule?: string | null;
  location?: string | null;
}
