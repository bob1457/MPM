import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './account/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'REALConcepts';

  constructor(public router: Router, private authService: AuthService) {}

  login() {
    this.authService.login();
    console.log('login...');
  }
}
