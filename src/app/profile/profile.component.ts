import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
})
export class ProfileComponent {
  user: any;

  constructor(private router: Router) {
    const userData = sessionStorage.getItem('loggedInUser');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
    }
  }

  logout() {
    sessionStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}


