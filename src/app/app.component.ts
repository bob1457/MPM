import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './account/services/auth.service';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'REALConcepts';


  authenticated = false;

  constructor(public router: Router,
              private authService: AuthService,
              public oidcSecurityService: OidcSecurityService) {}

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe((auth) => {
      console.log('is authenticated', auth);
      this.authenticated = auth;
    });
  }

  login() {
    debugger;
    // this.authService.login();
    // console.log('start login...');
    this.oidcSecurityService.authorize();

    this.oidcSecurityService.authorize((authUrl) => {
      // handle the authorrization URL
      window.open(authUrl, '_blank', 'toolbar=0,location=0,menubar=0');
  });

    // console.log('login...');

    // window.open(authUrl, '_blank', 'toolbar=0,location=0,menubar=0');
  }

  getApi() {
    debugger;
    this.authService.getApi();
  }

  logout() {
    this.oidcSecurityService.logoff();
  }
}


