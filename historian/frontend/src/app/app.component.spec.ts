import { TestBed, async } from '@angular/core/testing';

// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; // we also need angular router for Nebular to function properly
// components
import { AppComponent } from './app.component';
// router
import { AppRoutingModule } from './app-routing.module';
// nebular modules
import { NbThemeModule } from '@nebular/theme';
import { NbSidebarModule, NbLayoutModule, NbSidebarService } from '@nebular/theme';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NbThemeModule.forRoot({ name: 'default' }), // default theme, available[`cosmic`]
        AppRoutingModule,
        NbLayoutModule,
        NbSidebarModule,
      ],
      providers: [NbSidebarService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  }));
});
