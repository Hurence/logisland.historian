import { Injectable } from '@angular/core';


@Injectable()
export class ProfilService {

  private helpHidden = true;

  isHelpHidden(): boolean {
    return this.helpHidden;
  }

  toggleHelp(): void {
      this.helpHidden = !this.helpHidden;
  }
}
