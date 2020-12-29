import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-org-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {


  toolkitItems = [
    { linkTitle: 'Organize yourself', link: ['/toolkit/organizer']},
    { linkTitle: 'Relaxing space', link: ['/toolkit/relaxing-space']},
    { linkTitle: 'Motivation corner', link: ['/toolkit/motivation-corner']},
  ];

  schoolItems = [
    { linkTitle: 'Transerfing', link: ['/transerfing']},
    { linkTitle: 'Law of attraction', link: ['/law-of-attraction']},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
