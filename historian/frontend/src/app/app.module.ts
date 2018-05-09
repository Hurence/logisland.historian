// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , APP_INITIALIZER} from '@angular/core';
import { RouterModule } from '@angular/router';
// components
import { AppComponent } from './app.component';
// router
import { AppRoutingModule } from './app-routing.module';
// keycloak-angular
import { KeycloakService, KeycloakAngularModule } from 'keycloak-angular';
import { initializer } from './app-init';

import { DatasourceService } from './datasource/datasource.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TagsListComponent } from './sources-and-tags/tags-list/tags-list.component';
import { TagService } from './sources-and-tags/tag.service';
import { CustomHttpInterceptor } from './security-http-interceptor';
import { SourcesAndTagsComponent } from './sources-and-tags/sources-and-tags.component';
import { TodoComponent } from './todo/todo.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { SourcesAndTagsModule }     from './sources-and-tags/sources-and-tags.module';

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
    DatasourceService,
    TagService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
