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
  id: string;
  eventTypes: NoteCategory[];
}

export interface UserInsideNote {
  id: number;
  user_ulid: string;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
}

export interface CategoryInsideNote {
  id: string;
  numeric_id: number;
  name: string;
  color: string;
}

export interface AttahchmentInsideNote {
  id: string;
  file_name: string;
  file_url: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  date: string; // ISO string format
  pinned: boolean;
  order_index: number;
  is_deleted: boolean;
  deleted_at: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
  user: UserInsideNote;
  category: CategoryInsideNote;
  attachments: AttahchmentInsideNote[];
}
