import {Routes} from '@angular/router';
import {UserListPage} from './pages/user-list-page/user-list-page.component';
import {ProfilePage} from './pages/profile-page/profile-page';
import {ErrorPage} from './pages/error-page/error-page';
import {GamePage} from './pages/game-page/game-page';
import {HomePage} from './pages/home-page/home-page';

export const routes: Routes = [
  {path: 'home', component: HomePage},
  {path: 'users', component: UserListPage},
  {path: 'profile/:userProfileId', component: ProfilePage},
  {path: 'game/:gameId', component: GamePage},
  {path: 'error', component: ErrorPage},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '**', redirectTo: 'home'},
];
