import { Component } from '@angular/core';

import { MeasuresService } from '../../../measure/measures.service';
import { BaseElementTagComponent } from '../BaseElementTagComponent';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css']
})
export class TagListComponent extends BaseElementTagComponent {

  constructor(protected measuresService: MeasuresService) {
    super();
  }
}
