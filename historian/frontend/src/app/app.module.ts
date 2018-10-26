// angular modules
import { PlatformLocation } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/components/common/messageservice';

import { initializer } from './app-init';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFlowService } from './dataflow.service';
import { MeasuresService } from './measure/measures.service';
import { DatasourceService } from './modules/datasource/datasource.service';
import { SelectionModule } from './modules/selection/selection.module';
import { SelectionService } from './modules/selection/selection.service';
import { NgTreenodeService } from './modules/tag/service/ng-treenode.service';
import { TagHistorianService } from './modules/tag/service/tag-historian.service';
import { TagOpcService } from './modules/tag/service/tag-opc.service';
import { TagService } from './modules/tag/service/tag.service';
import { VisualizationModule } from './modules/visualization/visualization.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilService } from './profil/profil.service';
import { CustomHttpInterceptor } from './security-http-interceptor';
import { ArrayUtil } from './shared/array-util';
import { QuestionControlService } from './shared/dynamic-form/question-control.service';
import { QuestionService } from './shared/dynamic-form/question.service';
import { SharedModule } from './shared/shared.module';
import { Utilities } from './shared/utilities.service';
import { TodoComponent } from './todo/todo.component';
import { CookieService } from 'ngx-cookie-service';
import { DatasourceModule } from './modules/datasource/datasource.module';
import { FileUtil } from './shared/file/file.service';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { GaugeConverter } from './core/modele/gauge/GaugeConverter';

/**
 * This function is used internal to get a string instance of the `<base href="" />` value from `index.html`.
 * This is an exported function, instead of a private function or inline lambda, to prevent this error:
 *
 * `Error encountered resolving symbol values statically.`
 * `Function calls are not supported.`
 * `Consider replacing the function or lambda with a reference to an exported function.`
 *
 * @param platformLocation an Angular service used to interact with a browser's URL
 * @return a string instance of the `<base href="" />` value from `index.html`
 */
export function getBaseHref(platformLocation: PlatformLocation): string {
  return platformLocation.getBaseHrefFromDOM();
}

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
    DatasourceModule,
    VisualizationModule,
    SelectionModule,
    BrowserAnimationsModule,
    SharedModule,
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
    TagService,
    TagOpcService,
    TagHistorianService,
    DatasourceService,
    QuestionService,
    QuestionControlService,
    Utilities,
    MeasuresService,
    SelectionService,
    NgTreenodeService,
    ArrayUtil,
    MessageService,
    ConfirmationService,
    DataFlowService,
    CookieService,
    FileUtil,
    DashboardService,
    GaugeConverter,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
