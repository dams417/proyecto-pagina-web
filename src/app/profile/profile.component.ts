import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  profile = {
    name: 'Juan Pérez',
    carrera: 'Ingeniería en Sistemas',
    ano: '2024',
    foto: 'path/to/foto.jpg',
  };

  onEditProfile() {
    console.log('Editar perfil');
  }
}

