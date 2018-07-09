import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcTagTreeComponent } from './opc-tag-tree.component';

describe('OpcTagTreeComponent', () => {
  let component: OpcTagTreeComponent;
  let fixture: ComponentFixture<OpcTagTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpcTagTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcTagTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
