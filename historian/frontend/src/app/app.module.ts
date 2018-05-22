// angular modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { initializer } from './app-init';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CustomHttpInterceptor } from './security-http-interceptor';
import { SourcesAndTagsModule } from './sources-and-tags/sources-and-tags.module';
import { TodoComponent } from './todo/todo.component';
import { ProfilService } from './profil/profil.service';
import { DatasetService } from './dataset/dataset.service.';
import { TagService } from './tag/tag.service';
import { DialogService } from './dialog/dialog.service';
import { DatasourceService } from './datasource/datasource.service';

// components
// router
// keycloak-angular
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    SourcesAndTagsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    ProfilService,
    DatasetService,
    TagService,
    DatasourceService,
    DialogService,
    ProfilService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
