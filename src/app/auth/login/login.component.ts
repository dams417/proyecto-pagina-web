import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.loginError = null; // Reinicia errores previos
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const isAuthenticated = this.authService.login(email, password);
      if (isAuthenticated) {
        console.log('Login successful');
        // Redirige al usuario o muestra un mensaje de éxito
      } else {
        this.loginError = 'Credenciales inválidas. Intente de nuevo.';
      }
    } else {
      this.loginError = 'Por favor, complete todos los campos correctamente.';
    }
  }
}


