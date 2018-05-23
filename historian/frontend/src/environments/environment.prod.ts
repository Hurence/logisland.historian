export const environment = {
  production: true,
  KEYCLOAK_URL: 'http://keycloak:8080/auth',
  KEYCLOAK_REALM: 'logisland',
  KEYCLOAK_CLIENTID: 'logisland-historian',
  KEYCLOAK_CLIENTID_SECRET: '4509b60c-4489-4fef-a24e-1ce9377b7d77',
  KEYCLOAK_LOGOUT_URL: 'http://keycloak:8080/auth/realms/logisland/protocol/openid-connect/logout?redirect_uri=http://localhost:4200/',
};
