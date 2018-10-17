import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'primeng/accordion';
import { TreeDragDropService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { InputSwitchModule } from 'primeng/inputswitch';
import { MenuModule } from 'primeng/menu';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';

import { ButtonLabelledComponent } from './button-labelled/button-labelled.component';
import {
  DynamicFormQuestionArrayComponent,
} from './dynamic-form/dynamic-form-question-array/dynamic-form-question-array.component';
import {
  DynamicFormQuestionRadioComponent,
} from './dynamic-form/dynamic-form-question-radio/dynamic-form-question-radio.component';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { RefreshRateSelectionComponent } from './refresh-rate-selection/refresh-rate-selection.component';
import { SearchComponent } from './search/search.component';
import { TimeRangeSelectionComponent } from './time-range-selection/time-range-selection.component';
import { CalendarModule } from 'primeng/calendar';
import {MenubarModule} from 'primeng/menubar';
import {ProgressBarModule} from 'primeng/progressbar';
import { DynamicFormQuestionHistorianTagDropdownComponent } from 
  './dynamic-form/dynamic-form-question-historian-tag-dropdown/dynamic-form-question-historian-tag-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartModule,
    DataViewModule,
    DropdownModule,
    MenuModule,
    PanelMenuModule,
    FormsModule,
    PanelModule,
    TreeModule,
    AccordionModule,
    TabViewModule,
    InputSwitchModule,
    TooltipModule,
    ButtonModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    CheckboxModule,
    RadioButtonModule,
    CalendarModule,
    MenubarModule,
    ProgressBarModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ChartModule,
    DataViewModule,
    DropdownModule,
    MenuModule,
    PanelMenuModule,
    FormsModule,
    PanelModule,
    TreeModule,
    AccordionModule,
    RefreshRateSelectionComponent,
    TabViewModule,
    InputSwitchModule,
    TooltipModule,
    ButtonModule,
    GrowlModule,
    ConfirmDialogModule,
    DialogModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    CheckboxModule,
    RadioButtonModule,
    TimeRangeSelectionComponent,
    CalendarModule,
    MenubarModule,
    ProgressBarModule
  ],
  providers: [
    TreeDragDropService,
  ],
  declarations: [
    SearchComponent,
    ButtonLabelledComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    DynamicFormQuestionArrayComponent,
    RefreshRateSelectionComponent,
    DynamicFormQuestionRadioComponent,
    TimeRangeSelectionComponent,
    DynamicFormQuestionHistorianTagDropdownComponent,
  ],
})
export class SharedModule { }
