import {Routes} from '@angular/router';
import {GamePage} from './features/games/game-page';
import {TrophiesComponent} from './features/trophies/trophies.component';

export const routes: Routes = [
  {path: 'games', component: GamePage},
  {path: 'trophies', component: TrophiesComponent},
  {path: '', redirectTo: 'games', pathMatch: 'full'},
  {path: '**', redirectTo: 'games'},
];
