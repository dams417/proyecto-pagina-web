import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { RecoverComponent } from './recover/recover.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recover', component: RecoverComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'feed', component: PostFeedComponent }, // Ruta para el feed de publicaciones
  { path: 'profile-edit', component: ProfileEditComponent } // Ajusta si tienes otro componente para edición
    // ... otras rutas
];



