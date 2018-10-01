import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCsvImportComponent } from './tag-csv-import.component';

describe('TagCsvImportComponent', () => {
  let component: TagCsvImportComponent;
  let fixture: ComponentFixture<TagCsvImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCsvImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCsvImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
