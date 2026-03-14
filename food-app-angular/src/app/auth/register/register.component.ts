import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;

  // Validation patterns
  private NAME_REGEX = "^[A-Za-zÀ-ÖØ-öø-ÿ'\-\s]{2,}$";
  private PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+/;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.NAME_REGEX)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(this.NAME_REGEX)]],
      userType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.PASSWORD_REGEX)]],
      confirm: ['', Validators.required]
    }, { validators: this.matchPasswords });
  }

  // Cross-field validator for password match
  matchPasswords = (group: FormGroup) => {
    const pw = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return pw && confirm && pw === confirm ? null : { passwordMismatch: true };
  };

  get passwordMismatch(): boolean {
    return this.form.hasError('passwordMismatch');
  }

  // Convenience getters for template
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get confirm() { return this.form.get('confirm'); }

  // Password criteria checks for UI feedback
  passwordCriteria() {
    const val: string = this.password?.value || '';
    return {
      minLength: val.length >= 8,
      hasUpper: /[A-Z]/.test(val),
      hasLower: /[a-z]/.test(val),
      hasNumber: /\d/.test(val),
      hasSpecial: /[^A-Za-z0-9]/.test(val)
    };
  }

  submit() {
    if (this.form.valid && this.form.value.password === this.form.value.confirm) {
      // TODO: wire registration
      this.router.navigate(['/login']);
    }
  }
}
