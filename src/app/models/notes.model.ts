export interface CreateNoteRequest {
  title: string;
  content: string;
  date: string;
  category_name: string;
}

export interface NoteCategory {
  category_id: string;
  numeric_id: number;
  name: string;
  color: string;
  count: number;
}

export type NotesApiResponse = Record<string, NoteCategory[]>;

export interface DayData {
  date: Date;
  eventTypes: NoteCategory[];
}