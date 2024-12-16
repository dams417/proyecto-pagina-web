import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

// Importaciones de Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Importaciones de Formularios
import { ReactiveFormsModule } from '@angular/forms';

// Importaciones de Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom([
      MatCardModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule
    ]),
    // Configuración de Firebase
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyDI4LSd8BQh3ytHPlqG6adXkU2Ekqrk1MQ",
      authDomain: "sigpedcbaa.firebaseapp.com",
      projectId: "sigpedcbaa",
      storageBucket: "sigpedcbaa.appspot.com",
      messagingSenderId: "437715819874",
      appId: "1:437715819874:web:62a8cd3e271f4af977203b",
      measurementId: "G-10C113G273"
    })),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ]
};
