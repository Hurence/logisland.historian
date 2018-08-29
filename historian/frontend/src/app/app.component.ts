import { Component, OnInit, Inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ProfilService } from './profil/profil.service';
import { environment } from '../environments/environment';
import { APP_BASE_HREF } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username: string;
  logoutUrl: string;

  constructor(private keycloakService: KeycloakService,
              public profilService: ProfilService,
              @Inject(APP_BASE_HREF) private baseHref:string) {
                const baseUri: string = "TODO"
                this.logoutUrl = `${environment.AUTHENTICATION_BASE_URL}${environment.KEYCLOAK_LOGOUT_URL_REDIRECT}${baseHref}`;
              }

  public ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(profil => {
      this.username = profil.username;
    });
  }

  toggleHelp(): void {
    this.profilService.toggleHelp();
  }

}
