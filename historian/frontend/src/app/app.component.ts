import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

import { environment } from '../environments/environment';
import { ProfilService } from './profil/profil.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  username: string;
  logoutUrl: string;

  constructor(private keycloakService: KeycloakService,
              public profilService: ProfilService) {
                this.logoutUrl = `${environment.AUTHENTICATION_BASE_URL}${environment.KEYCLOAK_LOGOUT_URL_REDIRECT}${document.baseURI}`;
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
