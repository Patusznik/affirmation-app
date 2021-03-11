import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Affirmation } from '../affirmation.model';
import { AffirmationService } from '../affirmation.service';

@Component({
  selector: 'ezo-affirmation-detail',
  templateUrl: './affirmation-detail.component.html',
  styleUrls: ['./affirmation-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AffirmationDetailComponent implements OnInit {
  @Input() affirmation: Affirmation;

  constructor(private affService: AffirmationService) {}

  ngOnInit(): void {}
}
