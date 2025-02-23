import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { LogoComponent } from '../logo/logo.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forget-password',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, LogoComponent, MatIconModule,
      RouterModule
    ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgetPasswordComponent {

  resetForm: FormGroup;
  checkemail:WritableSignal<boolean> = signal<boolean>(false);
  checkEmailMessage:WritableSignal<string> = signal<string>('');
  private readonly destroyRef = inject(DestroyRef)
  
  constructor(public fb: FormBuilder, private readonly authService: AuthService, public router: Router, private readonly toastr: ToastrService, private readonly spinner: NgxSpinnerService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.spinner.show();
      const email = this.resetForm.get('email')?.value;
      this.authService.forgotPassword(email).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (res) => {
          if(res.isSuccess) {
            this.toastr.success(res.messages[0], 'Success', { timeOut: 2000 });
            this.resetForm.reset();
            this.checkemail.set(true);
            this.checkEmailMessage.set(res.messages[0]);
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
}
