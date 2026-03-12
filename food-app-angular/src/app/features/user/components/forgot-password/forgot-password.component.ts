import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm!: FormGroup;
  verificationForm!: FormGroup;
  resetForm!: FormGroup;
  
  currentStep = 0;
  isLoading = false;
  userEmail = '';
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForms();
  }

  private initializeForms(): void {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.verificationForm = this.formBuilder.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.resetForm = this.formBuilder.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  private passwordMatchValidator(group: FormGroup): { [key: string]: any } | null {
    const password = group.get('newPassword');
    const confirmPassword = group.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return null;
  }

  // Step 1: Send Reset Email
  sendResetEmail(): void {
    if (this.emailForm.invalid) {
      this.toastService.error('Please enter a valid email address');
      return;
    }

    this.isLoading = true;
    this.loadingService.show();
    this.userEmail = this.emailForm.value.email;

    this.authService.requestPasswordReset(this.userEmail).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.loadingService.hide();
        this.toastService.success('Verification code sent to your email');
        this.currentStep = 1;
      },
      error: (error) => {
        this.isLoading = false;
        this.loadingService.hide();
        const message = error?.error?.message || 'Failed to send reset email. Please try again.';
        this.toastService.error(message);
      }
    });
  }

  // Step 2: Verify Code
  verifyCode(): void {
    if (this.verificationForm.invalid) {
      this.toastService.error('Please enter the 6-digit code');
      return;
    }

    this.isLoading = true;
    this.loadingService.show();

    const verificationCode = this.verificationForm.value.code;

    this.authService.verifyResetCode(this.userEmail, verificationCode).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.loadingService.hide();
        this.toastService.success('Code verified! Please set your new password');
        this.currentStep = 2;
      },
      error: (error) => {
        this.isLoading = false;
        this.loadingService.hide();
        const message = error?.error?.message || 'Invalid verification code. Please try again.';
        this.toastService.error(message);
      }
    });
  }

  // Step 3: Reset Password
  resetPassword(): void {
    if (this.resetForm.invalid) {
      this.toastService.error('Please fill in all required fields correctly');
      return;
    }

    this.isLoading = true;
    this.loadingService.show();

    const resetData = {
      email: this.userEmail,
      newPassword: this.resetForm.value.newPassword
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.loadingService.hide();
        this.toastService.success('Password reset successful! Redirecting to login...');
        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false;
        this.loadingService.hide();
        const message = error?.error?.message || 'Failed to reset password. Please try again.';
        this.toastService.error(message);
      }
    });
  }

  toggleNewPasswordVisibility(): void {
    this.hideNewPassword = !this.hideNewPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }

  goBack(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  getEmailError(): string {
    const control = this.emailForm.get('email');
    if (control?.hasError('required')) return 'Email is required';
    if (control?.hasError('email')) return 'Please enter a valid email';
    return '';
  }

  getCodeError(): string {
    const control = this.verificationForm.get('code');
    if (control?.hasError('required')) return 'Verification code is required';
    if (control?.hasError('minlength')) return 'Code must be 6 digits';
    return '';
  }

  getPasswordError(): string {
    const control = this.resetForm.get('newPassword');
    if (control?.hasError('required')) return 'Password is required';
    if (control?.hasError('minlength')) return 'Password must be at least 8 characters';
    return '';
  }

  getConfirmPasswordError(): string {
    const control = this.resetForm.get('confirmPassword');
    if (control?.hasError('required')) return 'Please confirm your password';
    if (this.resetForm.hasError('passwordMismatch')) return 'Passwords do not match';
    return '';
  }
}
