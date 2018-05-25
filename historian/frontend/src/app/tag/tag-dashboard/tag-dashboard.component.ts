import { Component, OnInit } from '@angular/core';
import { DatasetService } from '../../dataset/dataset.service.';
import { Router, ActivatedRoute } from '@angular/router';
import { Dataset } from '../../dataset/dataset';
import { Tag } from '../tag';
import { ProfilService } from '../../profil/profil.service';

@Component({
  selector: 'app-tag-dashboard',
  templateUrl: './tag-dashboard.component.html',
  styleUrls: ['./tag-dashboard.component.css']
})
export class TagDashboardComponent implements OnInit {

  dataSet: Dataset;
  selectedTags: Set<Tag> = new Set();
  filterPlaceHolder = 'Type to filter by type or by description...';
  
  constructor(private datasetService: DatasetService,
    private router: Router,
    private route: ActivatedRoute,
    private profilService: ProfilService) { }

  ngOnInit() {
    this.datasetService.getMyDataset()
      .subscribe(dataSet => this.dataSet = dataSet);
  }

  datasetHasNoTags(): boolean {    
    return this.dataSet.hasNoTag();
  }

  goToDatasource(): void {
    this.router.navigate(['../datasources'], { relativeTo: this.route });
  }

  goToConfig(): void {
    this.router.navigate(['../configuration'], { relativeTo: this.route });
  }

  /* DO
  nothing if tag is null
  remove tag if already selected
  else add tag to selection */
  onSelectTag(tag: Tag): void {    
    if (tag !== null && !this.selectedTags.delete(tag)) {      
      this.selectedTags.add(tag);
    }
  }

  isHelpHidden(): boolean {
    return this.profilService.isHelpHidden();
  }

}
