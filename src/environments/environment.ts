// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import * as Oidc from 'oidc-client';

export const environment = {
  production: false,
  authConfig: {
    authority: 'https://localhost:44399/',
    client_id: 'client_id_js',
    // redirect_uri: 'http://localhost:4200/auth-callback',
    redirect_uri: 'http://localhost:4200',
    response_type: 'code',
    scope: 'openid rc.scope ApiOne ApiTwo', // need update
    post_logout_redirect_uri: 'http://localhost:4200' //,
    // userStore: new Oidc.WebStorageStateStore({ store: window.localStorage })

    // silent_redirect_uri: 'http://localhost:4200/silent-renew.html',
    // automaticSilentRenew: true
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
