import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  form: any;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({ email: ['', [Validators.required, Validators.email]] });
  }

  submit() {
    if (this.form.valid) {
      // TODO: send reset link
      this.router.navigate(['/login']);
    }
  }
}
