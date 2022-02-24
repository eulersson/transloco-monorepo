import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { SharedI18nModule } from '@transloco-monorepo/shared/i18n';

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
export class AppModule {}
