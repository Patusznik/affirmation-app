import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';

import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'ezo-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  toolkitItems = [
    { linkTitle: 'Organize yourself', link: ['/toolkit/organizer'] },
    { linkTitle: 'Relaxing space', link: ['/toolkit/relaxing-space'] },
    { linkTitle: 'Motivation corner', link: ['/toolkit/motivation-corner'] }
  ];

  schoolItems = [
    { linkTitle: 'Transerfing', link: ['/transerfing'] },
    { linkTitle: 'Law of attraction', link: ['/law-of-attraction'] }
  ];

  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;
  isLoading: boolean;
  constructor(public auth: AuthService, private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (
          event['url'] == '/user-pages/login' ||
          event['url'] == '/user-pages/register' ||
          event['url'] == '/error-pages/404' ||
          event['url'] == '/error-pages/500'
        ) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel').classList.add('w-100');
          document
            .querySelector('.page-body-wrapper')
            .classList.add('full-page-wrapper');
          document
            .querySelector('.content-wrapper')
            .classList.remove('auth', 'auth-img-bg');
          document
            .querySelector('.content-wrapper')
            .classList.remove('auth', 'lock-full-bg');
          if (
            event['url'] == '/error-pages/404' ||
            event['url'] == '/error-pages/500'
          ) {
            document.querySelector('.content-wrapper').classList.add('p-0');
          }
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          document.querySelector('.main-panel').classList.remove('w-100');
          document
            .querySelector('.page-body-wrapper')
            .classList.remove('full-page-wrapper');
          document
            .querySelector('.content-wrapper')
            .classList.remove('auth', 'auth-img-bg');
          document.querySelector('.content-wrapper').classList.remove('p-0');
        }
      }
    });

    // Spinner for lazyload modules
    router.events.forEach((event) => {
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading = true;
      } else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading = false;
      }
    });
  }

  ngOnInit() {
    // Scroll to top after route change
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
