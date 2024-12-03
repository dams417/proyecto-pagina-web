import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  // Ruta para iniciar sesión
  { path: 'login', component: LoginComponent },
  
  // Ruta para registro de usuarios
  { path: 'register', component: RegisterComponent },
  
  // Redirección por defecto a la página de inicio de sesión
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  // Redirección para rutas no válidas
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];



