import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ProfilService } from '../profil/profil.service';

export abstract class AbsSubscriberToSelectionOfTag implements OnDestroy {
    protected changeSelectionSubscription: Subscription;
    protected addTagSubscription: Subscription;
    protected removeTagSubscription: Subscription;

    constructor(protected profilService: ProfilService) {}

    ngOnDestroy() {
        if (this.changeSelectionSubscription) this.changeSelectionSubscription.unsubscribe();
        if (this.addTagSubscription) this.addTagSubscription.unsubscribe();
        if (this.removeTagSubscription) this.removeTagSubscription.unsubscribe();
    }
}
