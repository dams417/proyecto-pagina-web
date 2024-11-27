import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Para trabajar con formularios reactivos
import { MatCardModule } from '@angular/material/card'; // Para mat-card
import { MatFormFieldModule } from '@angular/material/form-field'; // Para mat-form-field y mat-label
import { MatInputModule } from '@angular/material/input'; // Para matInput
import { MatButtonModule } from '@angular/material/button'; // Para mat-raised-button
import { CommonModule } from '@angular/common'; // Para usar directivas comunes (ngIf, ngFor)
import { ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule

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
    ReactiveFormsModule // Agregar ReactiveFormsModule aquí
  ]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
