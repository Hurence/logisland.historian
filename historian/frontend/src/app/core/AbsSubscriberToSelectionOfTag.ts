import { Subscription } from 'rxjs';
import { OnDestroy, SimpleChanges, OnChanges, OnInit } from '@angular/core';
import { ProfilService } from '../profil/profil.service';
import { RefreshRateComponent } from '../shared/refresh-rate-selection/RefreshRateComponent';

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

export abstract class AbsSubscriberToSelectionOfTagWithRefresh extends RefreshRateComponent implements OnDestroy, OnChanges, OnInit {
    protected changeSelectionSubscription: Subscription;
    protected addTagSubscription: Subscription;
    protected removeTagSubscription: Subscription;

    constructor(protected profilService: ProfilService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
    }

    ngOnChanges(changes: SimpleChanges) {
        super.ngOnChanges(changes);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        if (this.changeSelectionSubscription) this.changeSelectionSubscription.unsubscribe();
        if (this.addTagSubscription) this.addTagSubscription.unsubscribe();
        if (this.removeTagSubscription) this.removeTagSubscription.unsubscribe();
    }
}
