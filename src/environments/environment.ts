// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

require('dotenv').config();

export const environment = {
  production: false,
  firebase: { 
    apiKey: process.env.TEST_APIKEY,
    authDomain: process.env.TEST_AUTHDOMAIN,
    databaseURL: process.env.TEST_DATABASEURL,
    projectId: process.env.TEST_PROJECTID,
    storageBucket: process.env.TEST_STORAGEBUCKET,
    messagingSenderId: process.env.TEST_MESSAGINGSENDERID,
    appId: process.env.TEST_APPID}
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
