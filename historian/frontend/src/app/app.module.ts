// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , APP_INITIALIZER} from '@angular/core';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
// components
import { AppComponent } from './app.component';
// router
import { AppRoutingModule } from './app-routing.module';
// keycloak-angular
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';
// nebular modules
import { NbThemeModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }), // default theme, available[`cosmic`]
    AppRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    KeycloakAngularModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    NbSidebarService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
