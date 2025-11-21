import {Routes} from '@angular/router';
import {UserListPage} from './features/user-list-page/user-list-page';
import {GamePage} from './features/game-page/game-page';
import {ProfilePage} from './features/profile-page/profile-page';
import {ErrorPage} from './features/error-page/error-page';

export const routes: Routes = [
  {path: 'games', component: GamePage},
  {path: 'users', component: UserListPage},
  {path: 'profile/:userProfileId', component: ProfilePage},
  {path: 'error', component: ErrorPage},
  {path: '', redirectTo: 'games', pathMatch: 'full'},
  {path: '**', redirectTo: 'games'},
];
