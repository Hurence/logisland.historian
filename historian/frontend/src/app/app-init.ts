import { KeycloakService } from 'keycloak-angular';
import { environment } from '../environments/environment';

/*
  Authentificatuion utility
*/

export function initializer(keycloak: KeycloakService): () => Promise<any> {
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      try {
        await keycloak.init({
          config: {
            realm: environment.KEYCLOAK_REALM,
            url: environment.KEYCLOAK_URL,
            clientId: environment.KEYCLOAK_CLIENTID,
            credentials: {
              secret: environment.KEYCLOAK_CLIENTID_SECRET
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
        }).then(function(result) {
          if (result) {
            console.log('autehntification succeeded !');
          } else {
            console.log('autehntification failed !');
          }
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };
}
