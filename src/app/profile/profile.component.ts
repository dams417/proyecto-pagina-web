import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card'; // Asegúrate de importar esto
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
  ]
  
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  // Método editProfile agregado
  editProfile() {
    this.router.navigate(['/profile/edit']); // Asegúrate de que la ruta está configurada correctamente
  }
}
