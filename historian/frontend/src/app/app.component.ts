import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ProfilService } from './profil/profil.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private profil: Keycloak.KeycloakProfile;
  logoutUrl: string;

  constructor(private keycloakService: KeycloakService,
              private profilService: ProfilService) {

                this.logoutUrl = environment.KEYCLOAK_LOGOUT_URL;
              }

  public ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(profil => this.profil = profil);
  }

  toggleHelp(): void {
    this.profilService.toggleHelp();
  }

}
