import { HostListener } from '@angular/core';

import { CanComponentDeactivate } from './can-deactivate-guard.service';

export abstract class ComponentCanDeactivate implements CanComponentDeactivate {

  abstract canDeactivate(): boolean;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (!this.canDeactivate()) {
        $event.returnValue = true;
    }
  }
}
