import { Component, Input, OnInit } from '@angular/core';

import { Measures } from '../../../measure/Measures';
import { MeasuresService } from '../../../measure/measures.service';
import { IHistorianTag } from '../../modele/HistorianTag';

@Component({
  selector: 'app-tag-cell-component',
  templateUrl: './tag-cell-component.component.html',
  styleUrls: ['./tag-cell-component.component.css']
})
export class TagCellComponentComponent implements OnInit {

  @Input() tag: IHistorianTag;
  stats: Measures;

  constructor(private measuresService: MeasuresService) { }

  ngOnInit() {
    this.measuresService.getStat('series-A').subscribe(stats => {
      this.stats = stats
    });
  }
}
