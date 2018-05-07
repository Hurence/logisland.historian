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
import { NbUserModule } from '@nebular/theme/components/user/user.module';
import { DatasourcesListComponent } from './datasources-list/datasources-list.component';
import { DatasourceService } from './datasource.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagsListComponent } from './tags-list/tags-list.component';
import { TagService } from './tag.service';
import { CustomHttpInterceptor } from './security-http-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    DatasourcesListComponent,
    TagsListComponent,
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }), // default theme, available[`cosmic`]
    AppRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    KeycloakAngularModule,
    NbUserModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER, // initialize keycloak authentification
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    },
    {
      provide: HTTP_INTERCEPTORS, // interceptor that add keycloack token to requests
      useClass: CustomHttpInterceptor,
      multi: true
    },
    NbSidebarService,
    DatasourceService,
    TagService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
