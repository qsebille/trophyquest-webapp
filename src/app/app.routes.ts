import {Routes} from '@angular/router';
import {Games} from './features/games/games';
import {Trophies} from './features/trophies/trophies';

export const routes: Routes = [
  { path: 'games', component: Games },
  { path: 'trophies', component: Trophies },
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: '**', redirectTo: 'games' },
];
