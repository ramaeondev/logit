import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteStateService {
  selectedDate: WritableSignal<Date> = signal(new Date());

  setSelectedDate(date: Date) {
    this.selectedDate.set(date);
  }
}
