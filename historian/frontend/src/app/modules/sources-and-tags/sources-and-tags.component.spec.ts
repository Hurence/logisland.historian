import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SourcesAndTagsComponent } from './sources-and-tags.component';

describe('SourcesAndTagsComponent', () => {
  let component: SourcesAndTagsComponent;
  let fixture: ComponentFixture<SourcesAndTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SourcesAndTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SourcesAndTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
