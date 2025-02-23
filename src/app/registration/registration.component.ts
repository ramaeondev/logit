import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LogoComponent } from '../logo/logo.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrService } from 'ngx-toastr';
import { UserRegistration } from '../models/user-registration.model';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, LogoComponent, MatIconModule,
    MatCheckboxModule, RouterModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegistrationComponent {

  registerForm: FormGroup;
  hidePassword: WritableSignal<boolean> = signal<boolean>(true);
  private readonly destroyRef = inject(DestroyRef)
  
  constructor(public fb: FormBuilder, private readonly authService: AuthService, public router: Router, private readonly toastr: ToastrService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      terms: [false, [Validators.requiredTrue]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user: UserRegistration = {
        first_name: this.registerForm.get('firstName')?.value,
        last_name: this.registerForm.get('lastName')?.value,
        email: this.registerForm.get('email')?.value,
        password: this.registerForm.get('password')?.value
      }
      console.log(user);
      this.authService.register(user).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if(res.isSuccess) {
            this.router.navigate(['/login']);
            this.toastr.success(res.messages[0], 'Success', { timeOut: 2000 });
          } else {
            console.log(res.errors[0]);
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  togglePassword() {
    this.hidePassword.update((value) => !value);
  }
}
