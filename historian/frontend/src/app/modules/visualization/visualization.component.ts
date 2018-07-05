import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.css']
})
export class VisualizationComponent implements OnInit {

  displayTagManagement = false;

  constructor() { }

  ngOnInit() {
  }

  showDialogTagManagement(): void {
    this.displayTagManagement = true;
  }
}
