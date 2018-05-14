import { Component, OnInit } from '@angular/core';
import { TagService } from '../tag.service';
import { Tag } from '../tag';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css']
})
export class TagsListComponent implements OnInit {

  tags: Tag[] = [];

  constructor(private tagService: TagService) { }

  ngOnInit() {
    this.getDatasources();
  }

  getDatasources(): void {
    this.tagService.getTags()
      .subscribe(tags => this.tags = tags);
  }

}
