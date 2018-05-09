import { Component, OnInit, Input } from '@angular/core';
import { Datasource } from '../Datasource';
import { DatasourceService } from '../datasource.service';

@Component({
  selector: 'app-datasource-form',
  templateUrl: './datasource-form.component.html',
  styleUrls: ['./datasource-form.component.css']
})
export class DatasourceFormComponent implements OnInit {

  datasourceTypes : String[];
  submitted = false;

  @Input()
  datasource: Datasource;

  constructor(private datasourceService: DatasourceService) { }

  ngOnInit() {
    this.datasourceTypes = this.datasourceService.getDatasourceTypes();
    // TODO: Remove this when we're done
    this.datasource = { id: '11', name: 'fake 1', domain: 'a', description: 'd', user: 'd', password: 'r', host: 'de' }
  }

  onSubmit() { this.submitted = true; }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.datasource); }

}
