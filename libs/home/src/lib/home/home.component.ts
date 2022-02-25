import { Component, OnInit } from '@angular/core';

import {
  AvailableLangs,
  TranslocoService,
  TRANSLOCO_SCOPE,
} from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'transloco-monorepo-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: TRANSLOCO_SCOPE, useValue: 'home' }],
})
export class HomeComponent {
  activeLang?: string;
  availableLangs: string[] = [];

  constructor(
    private translocoService: TranslocoService,
    private cookieService: CookieService
  ) {
    this.activeLang = this.translocoService.getActiveLang();
    this.availableLangs = this.translocoService.getAvailableLangs() as string[];
  }

  onLanguageChange(lang?: string) {
    if (lang) {
      this.translocoService.setActiveLang(lang);
      this.cookieService.set('lang', lang, undefined, '/')
    }
  }
}
