import {Routes} from '@angular/router';
import {PlayersPageComponent} from './pages/players-page/players-page.component';
import {ProfilePageComponent} from './pages/profile-page/profile-page.component';
import {ErrorPageComponent} from './pages/error-page/error-page.component';
import {CollectionPageComponent} from './pages/collection-page/collection-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'players', component: PlayersPageComponent},
    {path: 'profile/:playerId', component: ProfilePageComponent},
    {path: 'collection/:collectionId', component: CollectionPageComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
];
