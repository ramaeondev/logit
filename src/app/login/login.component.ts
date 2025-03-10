import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { LogoComponent } from "../logo/logo.component";
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { UserCredentials } from '../models/user-credentials.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { UserProfile } from '../models/user-profile.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, LogoComponent, MatIconModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class LoginComponent {

  loginForm: FormGroup;
  private readonly destroyRef = inject(DestroyRef);
  hidePassword:WritableSignal<boolean> = signal<boolean>(true);
  appName: WritableSignal<string> = signal<string>('');

  constructor(public fb: FormBuilder, private readonly authService: AuthService, public router: Router, private readonly toastr: ToastrService, private readonly spinner: NgxSpinnerService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.appName.set(environment.appName)
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.spinner.show();
      const credentials: UserCredentials = {
              username: this.loginForm.get('email')?.value,
              password: this.loginForm.get('password')?.value
            }
            this.authService.login(credentials).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
              next: (res) => {
                if(res.isSuccess) {
                  this.router.navigate(['/dashboard']);
                  this.toastr.success(res.messages[0], 'Success', { timeOut: 2000 });
                  let data: UserProfile = res.data as UserProfile;
                  localStorage.setItem('access_token', res?.access_token);
                  localStorage.setItem('refresh_token', res?.refresh_token);
                  localStorage.setItem('user_profile', JSON.stringify(data.user));
                  this.loginForm.reset();
                } else {
                  console.log(res.errors[0]);
                  this.toastr.error(res.errors[0], 'Error', { timeOut: 2000 });
                }
                this.spinner.hide();
              },
              error: (err) => {
                console.log(err);
                this.spinner.hide();
                this.toastr.error('An error occurred', 'Error', { timeOut: 2000 });
              }
            });

    }
  }
  
  togglePassword() {
    this.hidePassword.update((value) => !value);
  }

}
