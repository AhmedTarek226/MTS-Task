import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDisputeComponent } from './single-dispute.component';

describe('SingleDisputeComponent', () => {
  let component: SingleDisputeComponent;
  let fixture: ComponentFixture<SingleDisputeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleDisputeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleDisputeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
