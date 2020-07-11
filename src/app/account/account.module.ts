import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';

// import { AuthModule, LogLevel, OidcConfigService } from 'angular-auth-oidc-client';
// import * as Oidc from 'oidc-client';


// export function configureAuth(oidcConfigService: OidcConfigService) {
//   return () =>
//       oidcConfigService.withConfig({
//           // stsServer: 'https://localhost:44399',
//           // redirectUrl: 'http://localhost:4200', // window.location.origin,
//           // postLogoutRedirectUri:'http://localhost:4200', //  window.location.origin,
//           // clientId: 'client_id_js',
//           // scope: 'openid rc.scope ApiOne ApiTwo',
//           // responseType: 'code',
//           // silentRenew: true,
//           // silentRenewUrl: `${window.location.origin}/silent-renew.html`,
//           // logLevel: LogLevel.Debug,

//           // storage: new Oidc.WebStorageStateStore({store: window.localStorage})
//       });
// }

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule
  ],
  exports: [

  ],
  // providers: [
  //   OidcConfigService,
  //       {
  //           provide: APP_INITIALIZER,
  //           useFactory: configureAuth,
  //           deps: [OidcConfigService],
  //           multi: true,
  //       },
  // ],
})
export class AccountModule { }
