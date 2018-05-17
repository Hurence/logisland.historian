import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { ProfilService } from './profil/profil.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private profil: Keycloak.KeycloakProfile;
  private title = 'logisland historian';

  constructor(private keycloakService: KeycloakService,
              private profilService: ProfilService) {}

  public ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(profil => this.profil = profil);
  }

  toggleHelp(): void {
    this.profilService.toggleHelp();
  }

}
