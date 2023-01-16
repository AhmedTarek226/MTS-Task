import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDispute } from 'src/app/Models/dispute';
import { DisputeService } from 'src/app/Services/dispute.service';

@Component({
  selector: 'app-create-dispute',
  templateUrl: './create-dispute.component.html',
  styleUrls: ['./create-dispute.component.css'],
})
export class CreateDisputeComponent implements OnDestroy {
  disputeForm: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    private location: Location,
    private disputeService: DisputeService
  ) {
    this.disputeForm = new FormGroup({
      pan: new FormControl('', Validators.required),
      auth_ID: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      DISPUTE_DATE: new FormControl('', Validators.required),
      account_NO: new FormControl('', Validators.required),
      dispute_REASON: new FormControl('', Validators.required),
    });
  }

  create() {
    let disputeData = this.disputeForm.value as IDispute;
    // console.log(JSON.stringify(disputeData));
    disputeData.DISPUTE_DATE = disputeData.DISPUTE_DATE.replaceAll('-', '/');
    let sub = this.disputeService.createDispute(disputeData).subscribe({
      // this.location.back();
      complete: () => {
        alert('Created Successfully');
      },
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
