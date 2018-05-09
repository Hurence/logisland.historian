import { Component, OnInit } from '@angular/core';
import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-datasources-list',
  templateUrl: './datasources-list.component.html',
  styleUrls: ['./datasources-list.component.css']
})
export class DatasourcesListComponent implements OnInit {

  datasources: Datasource[] = [
    { id: '11', name: 'fake 1', domain: 'a', description: 'd', user: 'd', password: 'r', host: 'de' },
    { id: '12', name: 'fake 2', domain: 'a', description: 'd', user: 'd', password: 'r', host: 'de' }
  ];

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.getDatasources();
  }

  getDatasources(): void {
    this.datasourceService.getDatasources()
      .subscribe(datasources => this.datasources = datasources);
  }

}
