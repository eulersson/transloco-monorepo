import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { getBrowserLang, TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';

import {
  FALLBACK_TRANSLATION_MODEL,
  SharedI18nModule,
} from '@transloco-monorepo/shared/i18n';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(AppRouting),
    SharedI18nModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private translocoService: TranslocoService,
    private cookieService: CookieService
  ) {
    const prefLang =
      this.cookieService.get('lang') ||
      localStorage.getItem('lang') ||
      getBrowserLang();

    if (prefLang) {
      this.translocoService.setActiveLang(prefLang);
    }

    this.translocoService.langChanges$.subscribe((lang) => {
      console.log('[AppModule] [constructor] Lang changed:', lang);

      let fallbackLang = FALLBACK_TRANSLATION_MODEL['default'][0];

      if (FALLBACK_TRANSLATION_MODEL[lang]) {
        fallbackLang = FALLBACK_TRANSLATION_MODEL[lang][0];
      }

      console.log(
        '[AppModule] [constructor] fallbackLang',
        fallbackLang
      );

      this.translocoService.setFallbackLangForMissingTranslation({
        fallbackLang,
      });
    });
  }
}
