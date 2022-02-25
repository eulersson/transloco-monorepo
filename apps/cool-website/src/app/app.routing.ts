import { Routes } from '@angular/router';

import { HomeRouting } from '@transloco-monorepo/home';

export const AppRouting: Routes = [
  ...HomeRouting,
  {
    path: 'studio',
    loadChildren: () =>
      import('@transloco-monorepo/studio').then(
        (module) => module.StudioModule
      ),
  },
];
