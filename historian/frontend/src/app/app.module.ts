// angular modules
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { initializer } from './app-init';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DatasetService } from './dataset/dataset.service';
import { DatasourceService } from './modules/datasource/datasource.service';
import { DialogService } from './dialog/dialog.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfilService } from './profil/profil.service';
import { CustomHttpInterceptor } from './security-http-interceptor';
import { SharedModule } from './shared/shared.module';
import { SourcesAndTagsModule } from './modules/sources-and-tags/sources-and-tags.module';
import { TagService } from './modules/tag/service/tag.service';
import { TodoComponent } from './todo/todo.component';
import { QuestionService } from './shared/dynamic-form/question.service';
import { QuestionControlService } from './shared/dynamic-form/question-control.service';
import { TreeTagService } from './modules/tag/tag-tree/tree-view-tag.service';
import { TagHistorianService } from './modules/tag/service/tag-historian.service';
import { TagOpcService } from './modules/tag/service/tag-opc.service';
import { Utilities } from './shared/utilities.service';
import { LineChartComponent } from './graph/line-chart/line-chart.component';
import { VisualizationModule } from './modules/visualization/visualization.module';
import { MeasuresService } from './measure/measures.service';
import { SelectionService } from './modules/selection/selection.service';
import { SelectionDashboardComponent } from './modules/selection/selection-dashboard/selection-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    PageNotFoundComponent,
    LineChartComponent,
    SelectionDashboardComponent,
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    SourcesAndTagsModule,
    VisualizationModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
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
    TagOpcService,
    TagHistorianService,
    DatasourceService,
    DialogService,
    ProfilService,
    QuestionService,
    QuestionControlService,
    TreeTagService,
    Utilities,
    MeasuresService,
    SelectionService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
