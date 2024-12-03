import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.auth.getCurrentUser().subscribe((user) => {
      this.user = user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  logout() {
    this.auth.logout().then(() => this.router.navigate(['/login']));
  }
}

