// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    // baseUrl: 'https://localhost:44391/',
    // baseUrl: 'https://localhost:44363/' ,
    // baseUrl: 'https://www.stagingwin.com:9943/',
     baseUrl: 'https://schoolpandaapp.azurewebsites.net/',
   firebase: {
    apiKey: 'AIzaSyAXsKw2nGFWSCsU1nZWEMM6J0HVSwvY-6Y',
    authDomain: 'daycare-sdn.firebaseapp.com',
    databaseURL: 'https://daycare-sdn.firebaseio.com',
    projectId: 'daycare-sdn',
    storageBucket: 'daycare-sdn.appspot.com',
    messagingSenderId: '563279267944'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
