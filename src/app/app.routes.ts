import {Routes} from '@angular/router';
import {GamesComponent} from './features/games/games.component';
import {TrophiesComponent} from './features/trophies/trophies.component';

export const routes: Routes = [
  { path: 'games', component: GamesComponent },
  { path: 'trophies', component: TrophiesComponent },
  { path: '', redirectTo: 'games', pathMatch: 'full' },
  { path: '**', redirectTo: 'games' },
];
