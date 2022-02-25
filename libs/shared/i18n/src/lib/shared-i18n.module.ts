import { Injectable, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_CONFIG,
  TRANSLOCO_FALLBACK_STRATEGY,
  TRANSLOCO_LOADER,
  Translation,
  TranslocoFallbackStrategy,
  TranslocoLoader,
  TranslocoModule,
  getBrowserLang,
  translocoConfig,
} from '@ngneat/transloco';

export const FALLBACK_TRANSLATION_MODEL: { [key: string]: string[] } = {
  default: ['en', 'es', 'ca'],
  ca: ['es', 'en'],
  es: ['en', 'ca'],
  en: ['es', 'ca'],
  fr: ['en', 'ca'],
  oc: ['ca', 'fr'],
  pt: ['es', 'en'],
};

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export class CustomStrategy implements TranslocoFallbackStrategy {
  getNextLangs(failedLang: string) {
    console.log('Failed language:', failedLang);

    const browserLang = getBrowserLang();
    console.log('Browser language:', browserLang);

    const fallbackLangs =
      (browserLang && FALLBACK_TRANSLATION_MODEL[browserLang]) ||
      FALLBACK_TRANSLATION_MODEL['default'];

    console.log('Fallback languages:', fallbackLangs);
    return fallbackLangs;
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'es', 'fr', 'ca', 'oc', 'pt'],
        defaultLang: 'en',
        fallbackLang: 'en',
        missingHandler: {
          useFallbackTranslation: true,
        },
        reRenderOnLangChange: true,
        prodMode: false,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    { provide: TRANSLOCO_FALLBACK_STRATEGY, useClass: CustomStrategy },
  ],
})
export class SharedI18nModule {}
