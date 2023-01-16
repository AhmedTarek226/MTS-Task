import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDispute } from 'src/app/Models/dispute';
import { DisputeService } from 'src/app/Services/dispute.service';

@Component({
  selector: 'app-single-dispute',
  templateUrl: './single-dispute.component.html',
  styleUrls: ['./single-dispute.component.css'],
})
export class SingleDisputeComponent implements OnInit, OnDestroy {
  disputeId: string;
  currDispute!: IDispute;
  subscriptions: Subscription[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private disputeService: DisputeService
  ) {
    this.disputeId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    let sub = this.disputeService.getDisputeById(this.disputeId).subscribe({
      next: (data) => (this.currDispute = data[0]),
    });
    this.subscriptions.push(sub);
  }
  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
