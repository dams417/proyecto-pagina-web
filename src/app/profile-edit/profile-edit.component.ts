import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profileForm: FormGroup;

  careers = [
    'Ingeniería civil',
    'enfermeria',
    'ingenieria de Sistemas',
    'ingenieria ambiental',
    'ingenieria agroindustrial',
  ];

  academicYears = [
    'primer ciclo',
    'segundo ciclo',
    'tercer ciclo',
    'cuarto ciclo',
    'Quinto ciclo',
    'sexto ciclo',
    'septimo ciclo',
    'octavo ciclo',
    'noveno ciclo',
    'decimo ciclo'
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      career: ['', Validators.required],
      academicYear: ['', Validators.required],
      profileVisibility: ['public', Validators.required]
    });
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.profileForm.patchValue(currentUser);
  }

  onSubmit() {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...JSON.parse(localStorage.getItem('currentUser') || '{}'),
        ...this.profileForm.value
      };

      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      this.router.navigate(['/profile']);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.profileForm.controls).forEach(key => {
        const control = this.profileForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}