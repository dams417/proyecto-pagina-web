import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css'],
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class RecoverComponent {
  recoverForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.recoverForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onRecover() {
    if (this.recoverForm.valid) {
      const { email, newPassword } = this.recoverForm.value;

      // Recuperar usuarios almacenados
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email);

      if (user) {
        // Actualizar la contraseña del usuario
        user.password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));

        // Mostrar mensaje de éxito
        this.snackBar.open('Contraseña actualizada correctamente', 'Cerrar', { duration: 3000 });

        // Redirigir a login después de un pequeño retraso
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.snackBar.open('Correo no encontrado', 'Cerrar', { duration: 3000 });
      }
    } else {
      this.snackBar.open('Por favor, completa todos los campos correctamente', 'Cerrar', { duration: 3000 });
    }
  }
}
