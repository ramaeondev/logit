import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { StandardResponse } from '../app/models/standard.model';
import { LoginResponse, UserProfile } from '../app/models/user-profile.model';
import { UserCredentials } from '../app/models/user-credentials.model';
import { UserRegistration } from '../app/models/user-registration.model';
import { CreateNoteRequest } from '../app/models/notes.model';
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
}
