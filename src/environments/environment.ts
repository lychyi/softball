// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyClM8Sad3suRiJe4UYWSwVJMheIUBviQSs',
    authDomain: 'softball-v2.firebaseapp.com',
    databaseURL: 'https://softball-v2.firebaseio.com',
    projectId: 'softball-v2',
    storageBucket: 'softball-v2.appspot.com',
    messagingSenderId: '1053605817247'
  }
};
