import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCellComponent } from './tag-cell.component';

describe('TagCellComponent', () => {
  let component: TagCellComponent;
  let fixture: ComponentFixture<TagCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
