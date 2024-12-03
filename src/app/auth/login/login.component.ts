import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // Retrieve users from localStorage
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const user: User | undefined = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Store logged-in user info
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success message
        this.snackBar.open('Inicio de sesión exitoso', 'Cerrar', { duration: 3000 });

        // Navigate to profile after a short delay
        setTimeout(() => {
          this.router.navigate(['/profile']);
        }, 3000);
      } else {
        this.snackBar.open('Correo o contraseña incorrectos', 'Cerrar', { duration: 3000 });
      }
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  recoverAccount() {
    this.router.navigate(['/recover']); // Redirige a la página de recuperación
  }
}



