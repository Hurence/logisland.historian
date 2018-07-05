import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SourcesAndTagsComponent } from './modules/sources-and-tags/sources-and-tags.component';
import { VisualizationComponent } from './modules/visualization/visualization.component';
import { SelectionDashboardComponent } from './modules/selection/selection-dashboard/selection-dashboard.component';

const routes: Routes = [
  { path: 'visualization', component: VisualizationComponent },
  { path: 'selections', component: SelectionDashboardComponent },
  { path: 'sources-and-tags', component: SourcesAndTagsComponent },
  { path: '', redirectTo: 'sources-and-tags', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
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
