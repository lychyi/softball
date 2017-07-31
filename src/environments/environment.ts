// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBSXLeUCajwANcCQ2plYbE20XBjW6jzanQ',
    authDomain: 'illumina-softball-2017.firebaseapp.com',
    databaseURL: 'https://illumina-softball-2017.firebaseio.com',
    projectId: 'illumina-softball-2017',
    storageBucket: 'illumina-softball-2017.appspot.com',
    messagingSenderId: '828073611941'
  }
};
