import {Routes} from '@angular/router';
import {PlayersPageComponent} from './pages/players-page/players-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {GamePageComponent} from './game/components/game-page/game-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'players', component: PlayersPageComponent},
    {path: 'profile/:playerId', component: ProfilePageComponent},
    {path: 'game/:gameId', component: GamePageComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
];
