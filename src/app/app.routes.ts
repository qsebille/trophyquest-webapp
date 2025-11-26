import {Routes} from '@angular/router';
import {UserPage} from './pages/user-page/user-page.component';
import {ProfilePage} from './pages/profile-page/profile-page';
import {ErrorPage} from './pages/error-page/error-page';
import {GamePage} from './pages/game-page/game-page';

export const routes: Routes = [
  {path: 'users', component: UserPage},
  {path: 'profile/:userProfileId', component: ProfilePage},
  {path: 'game/:gameId', component: GamePage},
  {path: 'error', component: ErrorPage},
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: '**', redirectTo: 'users'},
];
