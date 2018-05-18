import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [ConfirmDialogComponent],
  providers: [
    DialogService,
  ],
  entryComponents: [ ConfirmDialogComponent ]
})
export class DialogModule { }
