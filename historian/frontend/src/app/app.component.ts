import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  profil: Keycloak.KeycloakProfile;
  title = 'logisland historian';

  constructor(private keycloakService: KeycloakService) {}

  public ngOnInit(): void {
    this.keycloakService.loadUserProfile().then(profil => this.profil = profil);
  }

}
