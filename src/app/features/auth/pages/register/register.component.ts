import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileApiService } from '../../../profile/services/profile-api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(
    private router: Router,
    private profileService: ProfileApiService
  ) {}

  register() {
    this.profileService.register({
      username: this.username,
      password: this.password
    }).then(resp => {
      console.log(resp);
      this.router.navigate(['/home']);
    }).catch(error => {
      if (typeof error === 'string') this.error = error;
      else this.error = error[0].type;
    })
  }
}
