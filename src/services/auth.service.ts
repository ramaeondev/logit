import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { StandardResponse } from '../app/models/standard.model';
import { LoginResponse, UserProfile } from '../app/models/user-profile.model';
import { UserCredentials } from '../app/models/user-credentials.model';
import { UserRegistration } from '../app/models/user-registration.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrlV1;

  constructor(private readonly http: HttpClient) {}

  register(user: UserRegistration): Observable<StandardResponse<{ user_id: string }>> {
    return this.http.post<StandardResponse<{ user_id: string }>>(
      `${this.baseUrl}/auth/register`,
      user
    );
  }
  

  login(credentials: UserCredentials): Observable<LoginResponse<UserProfile>> {
    const body = new HttpParams()
      .set('username', credentials.username)
      .set('password', credentials.password);
  
    return this.http.post<LoginResponse<UserProfile>>(
      `${this.baseUrl}/auth/login`,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } 
    );
  }
  
  confirmEmail(token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/confirm-email?token=${token}`);
  }

  forgotPassword(email: string): Observable<StandardResponse<{email: string}>> {
    return this.http.post<StandardResponse<{email: string}>>(
      `${this.baseUrl}/auth/reset-password/request`,
      { email }
    );
  }

  resetPassword(token: string, new_password: string): Observable<StandardResponse<{email: string}>> {
    return this.http.post<StandardResponse<{email: string}>>(
      `${this.baseUrl}/auth/reset-password`,
      { token, new_password }
    );
  }
}
