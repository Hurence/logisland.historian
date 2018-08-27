// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  KEYCLOAK_REALM: 'logisland',
  KEYCLOAK_CLIENTID: 'logisland-historian',
  KEYCLOAK_CLIENTID_SECRET: '4509b60c-4489-4fef-a24e-1ce9377b7d77',
  KEYCLOAK_LOGOUT_URL_REDIRECT: 'auth/realms/logisland/protocol/openid-connect/logout?redirect_uri=',  
  HISTORIAN_API_BASE_URL: '/api/v1/',
  AUTHENTICATION_BASE_URL: '/',
  TAG_UPDATE_RATE_DEFAUT: 10000,
};
