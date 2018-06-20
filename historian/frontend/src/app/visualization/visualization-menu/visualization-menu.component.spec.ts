import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizationMenuComponent } from './visualization-menu.component';

describe('VisualizationMenuComponent', () => {
  let component: VisualizationMenuComponent;
  let fixture: ComponentFixture<VisualizationMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizationMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
