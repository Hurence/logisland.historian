//angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//components
import { AppComponent } from './app.component';
//nebular modules
import { NbThemeModule } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }), // this will enable the default theme, you can change this to `cosmic` to enable the dark theme
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
