import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCellComponentComponent } from './tag-cell-component.component';

describe('TagCellComponentComponent', () => {
  let component: TagCellComponentComponent;
  let fixture: ComponentFixture<TagCellComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCellComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
