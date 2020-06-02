import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OidcSecurityService } from 'angular-auth-oidc-client';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private manager = new UserManager({
  //   authority: '',
  //   client_id: 'angular_spa',
  //   redirect_uri: 'http://localhost:4200/auth-callback',
  //   post_logout_redirect_uri: 'http://localhost:4200/',
  //   response_type: 'code',
  //   scope: 'openid profile email api.read',
  //   filterProtocolClaims: true,
  //   loadUserInfo: true
  // });

  headers: any;

  private userManager: UserManager = new UserManager(environment.authConfig);
  // public authStatusChagned: EventEmitter<User> = new EventEmitter();



  private user: User | null;
  // Observable navItem source
  private authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this.authNavStatusSource.asObservable();

  constructor(private router: Router,
              private httpClient: HttpClient,
              public oidcSecurityService: OidcSecurityService) { }

  login() {
    debugger;
    this.userManager.signinRedirect();
  }

  async loginCallBack() {
    this.user = await this.userManager.signinRedirectCallback();
    this.authNavStatusSource.next(this.isAuthenticated());
    // return Observable.create(observer => {
    //     Observable.fromPromise(this.userManager.signinRedirectCallback())
    //         .subscribe((user: User) => {
    //             this.authStatusChagned.emit(user);
    //             observer.next(user);
    //             observer.complete();
    //         });
    // });
    // this.userManager.getUser().then(user => {
    //   this.user = user;
    //   // this.authStatusChagned.next();
    //   this.authNavStatusSource.next(this.isAuthenticated());
    // });

  }

  isAuthenticated(): boolean {
        return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {

    return this.user ? `${this.user.token_type} ${this.user.access_token}` : null;
  }

  get name(): string {
    return this.user != null ? this.user.profile.name : '';
  }

  async signout() {
    await this.userManager.signoutRedirect();
  }

  getApi() {
    debugger;

    const token = this.oidcSecurityService.getToken();

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };

    // this.setHeaders();

    this.httpClient.get('http://localhost:25540/secret', httpOptions ).subscribe(res => {
      console.log(res);
    });
  }

  Logout() {
    console.log('sign-out');
    this.userManager.signinRedirect();
  }


  private setHeaders() {
    debugger;
    this.headers = new HttpHeaders();
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');

    const token = this.oidcSecurityService.getToken();

    if (token !== '') {
      const tokenValue = 'Bearer ' + token;
      this.headers = this.headers.set('Authorization', tokenValue);
    }
  }
}
