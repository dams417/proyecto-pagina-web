// Importaciones de Angular y AngularFire
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

// Importaciones de AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

// Importaciones de Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Importaciones de Formularios
import { ReactiveFormsModule } from '@angular/forms';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCLZw5oAC9oUij8mZjwE6t6koYs7MNtW3A",
  authDomain: "appagpe-d2d67.firebaseapp.com",
  projectId: "appagpe-d2d67",
  storageBucket: "appagpe-d2d67.firebasestorage.app",
  messagingSenderId: "674754185470",
  appId: "1:674754185470:web:fc583b958b22b0c0173daf",
  measurementId: "G-761BWS4DB7"
};

@NgModule({
  declarations: [
    // tus componentes aquí
  ],
  imports: [
    BrowserModule,
    // Inicialización de Firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAnalyticsModule,  // Solo si vas a usar Firebase Analytics
    AngularFireAuthModule,      // Solo si vas a usar autenticación
    AngularFireStorageModule,   // Solo si vas a usar Firebase Storage
    // Angular Material
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    // Configuración de rutas y animaciones
    provideAnimations()
  ],
  providers: [],
  bootstrap: [/* tu componente principal */]
})
export class AppModule { }
