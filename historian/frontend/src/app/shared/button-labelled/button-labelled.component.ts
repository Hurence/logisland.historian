import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-labelled',
  templateUrl: './button-labelled.component.html',
  styleUrls: ['./button-labelled.component.css']
})
export class ButtonLabelledComponent implements OnInit {

  @Input() centerLabel: string;
  @Input() topRightLabel?: string;
  @Input() bottomRightLabel?: string;
  @Input() isActive: boolean;
  @Input() styleClass: string;

  constructor() { }

  ngOnInit() {
  }

}
