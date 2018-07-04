import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorianTagTreeComponent } from './historian-tag-tree.component';

describe('HistorianTagTreeComponent', () => {
  let component: HistorianTagTreeComponent;
  let fixture: ComponentFixture<HistorianTagTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorianTagTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorianTagTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
