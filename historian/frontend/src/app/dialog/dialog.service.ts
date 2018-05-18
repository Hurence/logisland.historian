import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs/operators';
/**
 * Async modal dialog service
 */
@Injectable()
export class DialogService {

  constructor(private dialog: MatDialog) {}
  /**
   * Ask user to confirm an action. `message` explains the action.
   * Returns observable resolving to `true`=Yes or `false`=No
   */
  confirm(title?: string, message?: string): Observable<boolean> {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    // dialogConfig.position = {};
    dialogConfig.data = {
      title: title,
      message: message
    };

    let dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    return dialogRef.afterClosed();
  };
}
