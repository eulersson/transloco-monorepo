import { Routes } from '@angular/router';

import {StudioComponent} from './studio/studio.component';

export const StudioRoutes: Routes = [
  { path: '**', component: StudioComponent }
]
