import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { SharedI18nModule } from '@transloco-monorepo/shared/i18n';

@NgModule({
  imports: [CommonModule, FormsModule, SharedI18nModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
