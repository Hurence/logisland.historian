import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  declarations: [ConfirmDialogComponent, AlertDialogComponent],
  providers: [
    DialogService,
  ],
  entryComponents: [ ConfirmDialogComponent, AlertDialogComponent ]
})
export class DialogModule { }
