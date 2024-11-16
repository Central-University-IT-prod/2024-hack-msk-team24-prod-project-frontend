import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileApiService } from '../../../profile/services/profile-api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private router: Router,
    private profileService: ProfileApiService,
  ) {}

  login() {
    this.error = null;
    this.profileService.login({
      username: this.username,
      password: this.password
    }).then(resp => {
      this.router.navigate(['/home'])
    }).catch(error => {
      if (typeof error === 'string') this.error = error;
      else this.error = error[0].type;
    })
  }
}
