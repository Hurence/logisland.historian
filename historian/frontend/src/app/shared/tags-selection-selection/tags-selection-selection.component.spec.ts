import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSelectionSelectionComponent } from './tags-selection-selection.component';

describe('TagsSelectionSelectionComponent', () => {
  let component: TagsSelectionSelectionComponent;
  let fixture: ComponentFixture<TagsSelectionSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsSelectionSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsSelectionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
