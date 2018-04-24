
/*
  Authentificatuion utility
*/

import { KeycloakService } from 'keycloak-angular';

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            realm: 'logisland',
            url: 'http://keycloak:8080/auth',
            clientId: 'logisland-historian',
            credentials: {
              secret: '4509b60c-4489-4fef-a24e-1ce9377b7d77'
            }
          },
          initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
          },
          bearerExcludedUrls: [
            '/assets',
            '/clients/public'
          ],
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
