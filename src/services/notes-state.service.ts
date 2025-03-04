import { Injectable, signal, WritableSignal } from '@angular/core';
import { Note } from '../app/models/notes.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  selectedDate: WritableSignal<Date> = signal(new Date());
  selectedNotesForDate: WritableSignal<Note[]> = signal<Note[]>([]);
  dateChange$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>([]);

  setSelectedDate(date: Date) {
    this.selectedDate.set(date);
  }

  setSeletedNotes(notes: Note[]){
    this.selectedNotesForDate.set(notes); 
  }

  getSelectedNotes(): Note[] {
    return this.selectedNotesForDate();
  }
}
