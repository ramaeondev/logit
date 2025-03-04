import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CreateNoteRequest, Note } from '../app/models/notes.model';
import { StandardResponse } from '../app/models/standard.model';
@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private readonly baseUrl = environment.apiBaseUrlV1;

  constructor(private readonly http: HttpClient) {}

  createNote(note: CreateNoteRequest) : Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/notes/create-note`, note);
  }

  getAllNotes(month:number, year: number):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/notes/get-all-notes`, {month: month, year: year});  
  }
  getMonthlyNotesCounts(month:number, year: number):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/notes/get-all-notes-count`, {month: month, year: year});  
  }

  loadNotesSelectedDate(date: string): Observable<StandardResponse<Note[]>>  {
    return this.http.get<StandardResponse<Note[]>>(`${this.baseUrl}/notes/get-all-notes?date=${date}`);
  }
}
