import { Component, OnInit, Input } from '@angular/core';
import { RadioQuestion } from '../question-radio';
import { FormGroup } from '@angular/forms';
import { HistorianTag } from '../../../modules/tag/modele/HistorianTag';
import { HistorianTagDropdownQuestion } from '../question-historian-tag-dropdown';
import { TagHistorianService } from '../../../modules/tag/service/tag-historian.service';

@Component({
  selector: 'app-dynamic-form-question-historian-tag-dropdown',
  templateUrl: './dynamic-form-question-historian-tag-dropdown.component.html',
  styleUrls: ['./dynamic-form-question-historian-tag-dropdown.component.css']
})
export class DynamicFormQuestionHistorianTagDropdownComponent implements OnInit {

  @Input() question: HistorianTagDropdownQuestion;
  @Input() form: FormGroup;
  loadedOptions: {key: string, value: HistorianTag}[] = [];
  tags: HistorianTag[];

  constructor(private tagHistorianService: TagHistorianService) { }

  ngOnInit() {
    this.tagHistorianService.getAll().subscribe(tags => {
      this.tags = tags;
    });
  }

}
