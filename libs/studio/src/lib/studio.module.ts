import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TRANSLOCO_SCOPE } from '@ngneat/transloco';

import { SharedI18nModule } from '@transloco-monorepo/shared/i18n';

import { StudioComponent } from './studio/studio.component';
import { StudioRoutes } from './studio.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(StudioRoutes),
    SharedI18nModule,
  ],
  declarations: [StudioComponent],
  providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: 'studio',
    },
  ],
})
export class StudioModule {}
