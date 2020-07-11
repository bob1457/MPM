import { Injectable, EventEmitter } from '@angular/core';
import { UserManager, User } from 'oidc-client';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';





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

  constructor() {}




}
