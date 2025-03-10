import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, LogoComponent, MatIconModule,
        RouterModule
      ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent implements OnInit{

    resetForm: FormGroup;
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    private readonly destroyRef = inject(DestroyRef);
    hidePassword: WritableSignal<boolean> = signal<boolean>(true);
    hideConfirmPassword: WritableSignal<boolean> = signal<boolean>(true);
    resetToken: WritableSignal<string> = signal<string>('');
    appName: WritableSignal<string> = signal<string>('');

    constructor(public fb: FormBuilder, private readonly authService: AuthService, public route: ActivatedRoute,
      public router: Router, private readonly toastr: ToastrService, private readonly spinner: NgxSpinnerService) {
        this.resetForm = this.fb.group({
          password: ['', [Validators.required, Validators.pattern(this.passwordRegex)]],
          confirmPassword: ['',Validators.required]}, { validators: this.passwordMatchValidator });
          this.appName.set(environment.appName);
      }

      passwordMatchValidator(group: FormGroup) {
        const password = group.get('password')?.value;
        const confirmPassword = group.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
      }

    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
          this.resetToken.set(params['token']); 
        });
    }


      onSubmit() {
        if (this.resetForm.valid) {
          const password = this.resetForm.get('password')?.value;
          const confirmPassword = this.resetForm.get('confirmPassword')?.value;
          if (password !== confirmPassword) {
            this.toastr.error('Passwords do not match', 'Error', { timeOut: 2000 });
            return;
          }
          this.spinner.show();
          this.authService.resetPassword(this.resetToken(), password).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
            next: (res) => {
              if(res.isSuccess) {
                this.router.navigate(['/login']);
                this.toastr.success(res.messages[0], 'Success', { timeOut: 2000 });
              } else {
                console.log(res.errors[0]);
                this.toastr.error(res.errors[0], 'Error', { timeOut: 2000 });
              }
              this.spinner.hide();
            },
            error: (err) => {
              console.log(err);
              this.spinner.hide();
            }
          });
        }
      }

  togglePassword(formControlName: string) {
    if (formControlName === 'password') {
      this.hidePassword.update((value) => !value);
    }
    if (formControlName === 'confirmPassword') {
      this.hideConfirmPassword.update((value) => !value);
    }
  }
}
