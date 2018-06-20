import { Component } from '@angular/core';

import { MeasuresService } from '../../../measure/measures.service';
import { BaseElementTagComponent } from '../BaseElementTagComponent';

@Component({
  selector: 'app-tag-cell',
  templateUrl: './tag-cell.component.html',
  styleUrls: ['./tag-cell.component.css']
})
export class TagCellComponent  extends BaseElementTagComponent {

  constructor(protected measuresService: MeasuresService) {
    super();
  }
}
