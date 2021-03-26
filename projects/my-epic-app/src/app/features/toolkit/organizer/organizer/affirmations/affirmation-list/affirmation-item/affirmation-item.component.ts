import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { User } from 'projects/my-epic-app/src/app/shared/services/user';
import { Observable } from 'rxjs';

import { AuthService } from '../../../../../../../shared/services/auth.service';
import { Affirmation } from '../../affirmation.model';
import { AffirmationService } from '../../affirmation.service';

@Component({
  selector: 'ezo-affirmation-item',
  templateUrl: './affirmation-item.component.html',
  styleUrls: ['./affirmation-item.component.scss']
})
export class AffirmationItemComponent implements OnInit {
  @Input() affirmation: Affirmation;
  @Input() checked: boolean = false;
  @Output() affirmationSelected = new EventEmitter<void>();
  @Output() affirmationChecked = new EventEmitter<boolean>();

  // @Input() areAffirmationsLighted: boolean = false;
  user$: Observable<User> = this.auth.user$;

  constructor(
    private auth: AuthService,
    private affService: AffirmationService
  ) {}

  ngOnInit(): void {}

  @HostListener('click', ['$event'])
  onSelected(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    // this.affirmationSelected.emit();
  }

  checkUncheck() {
    console.log('check');
    this.affirmationChecked.emit(!this.checked);
    // this.affirmation.checked = !this.affirmation.checked;
    // console.log(this.affirmation.checked);
    // console.log(this.isChecked);
    console.log(this.checked);
    // this.affService.updateDocByID(id, this.affirmation.checked);
  }
  //   this.auth.usersAffirmations$.pipe(map(actions => actions.map(a => {
  //     const data = a.payload.doc.id.data()
  //     const id = a.payload.doc.id;
  //     return {id, ...data}
  //   }))).subscribe((_doc: any)=>{
  //     let id = _doc[0].payload.doc.id;
  //     this.
  //   })
  // }

  // checkAll(arr){
  //    arr.every(v => v === true)
  // }
}
