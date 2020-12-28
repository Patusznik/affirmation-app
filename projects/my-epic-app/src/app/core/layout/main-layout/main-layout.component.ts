import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-org-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {


  listItems = [
    { linkTitle: 'Organize yourself', link: ['/organizer']},
    { linkTitle: 'Relaxing space', link: ['/relaxing-space']},
    { linkTitle: 'Motivation corner', link: ['/motivation-corner']},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
