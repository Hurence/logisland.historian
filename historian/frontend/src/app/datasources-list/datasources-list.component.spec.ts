import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasourcesListComponent } from './datasources-list.component';
import { DatasourceService } from '../datasource.service';
import { HttpClientModule } from '@angular/common/http';

describe('DatasourcesListComponent', () => {
  let component: DatasourcesListComponent;
  let fixture: ComponentFixture<DatasourcesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasourcesListComponent ],
      imports: [
        HttpClientModule,
      ],
      providers: [
        DatasourceService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasourcesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
