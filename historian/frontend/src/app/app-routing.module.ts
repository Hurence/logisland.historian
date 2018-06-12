import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SourcesAndTagsComponent } from './sources-and-tags/sources-and-tags.component';
import { TodoComponent } from './todo/todo.component';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { LineChartComponent } from './graph/line-chart/line-chart.component';
import { TagDataviewComponent } from './tag/tag-dataview/tag-dataview.component';

const routes: Routes = [
  { path: 'sources-and-tags', component: SourcesAndTagsComponent },
  { path: 'grapher', component: LineChartComponent },
  { path: 'tabular', component: TagDataviewComponent },
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
