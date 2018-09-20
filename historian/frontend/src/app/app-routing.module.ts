import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { VisualizationComponent } from './modules/visualization/visualization.component';
import { DatasourceDashboardComponent } from './modules/datasource/datasource-dashboard/datasource-dashboard.component';

const routes: Routes = [
  {
    path: 'visualization',
    component: VisualizationComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'sources-and-tags',
    component: DatasourceDashboardComponent,
    canDeactivate: [CanDeactivateGuard]
  },
  { path: '', redirectTo: 'sources-and-tags', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        // useHash: true,
        // enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [ RouterModule ],
  providers: [
    CanDeactivateGuard,
  ]
})
export class AppRoutingModule { }
