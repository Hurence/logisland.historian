import { Injectable } from '@angular/core';
import { Observable,  of } from 'rxjs';
import { MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs/operators';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
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
  confirm(title?: string, cancelBtnMsg?: string, okBtnMsg?: string, message?: string): Observable<boolean> {

    const config = this.getDefautConfig({
      title: title || 'Confirm ?',
      cancelBtnMsg: cancelBtnMsg || 'Cancel',
      okBtnMsg: okBtnMsg || 'Ok',
      message: message || ''
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, config);

    return dialogRef.afterClosed();
  }

  /**
   * Ask user to confirm an action. `message` explains the action.
   * Returns observable resolving to `true`=Yes or `false`=No
   */
  alert(title?: string, message?: string): Observable<boolean> {

    const config = this.getDefautConfig({
      title: title || 'Alert something happened!',
      message: message || ''
    });

    const dialogRef = this.dialog.open(AlertDialogComponent, config);

    return dialogRef.afterClosed();
  }


  private getDefautConfig(data?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.data = data;

    return dialogConfig;
  }
}
