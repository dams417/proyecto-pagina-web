import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
  
      // Obtener usuarios existentes
      const existingUsers: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = existingUsers.some((u: User) => u.email === userData.email);
  
      if (userExists) {
        this.snackBar.open('Este correo ya está registrado', 'Cerrar', { duration: 3000 });
        return;
      }
  
      // Guardar nuevo usuario
      existingUsers.push(userData);
      localStorage.setItem('users', JSON.stringify(existingUsers));
  
      // Mostrar mensaje de éxito
      this.snackBar.open('Cuenta creada correctamente', 'Cerrar', { duration: 3000 });
  
      // Limpiar formulario
      this.registerForm.reset();
  
      // Redirigir a login después de un pequeño retraso
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 3000);
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
  
  goToLogin() {
    this.router.navigate(['/login']);
}}  