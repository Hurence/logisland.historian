import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SourcesAndTagsComponent } from './sources-and-tags/sources-and-tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'sources-and-tags', component: SourcesAndTagsComponent },
  { path: 'todo', component: TodoComponent },
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {
        useHash: true,
        enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
