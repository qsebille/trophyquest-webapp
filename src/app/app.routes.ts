import {Routes} from '@angular/router';
import {PlayersPageComponent} from './players/components/players-page/players-page.component';
import {ProfilePageComponent} from './profile/components/profile-page/profile-page.component';
import {ErrorPageComponent} from './core/components/error-page/error-page.component';
import {HomePageComponent} from './home/components/home-page/home-page.component';
import {
    ValidationPageComponent
} from "./trophy-set-mapping-validation/components/validation-page/validation-page.component";
import {TrophySetPageComponent} from "./trophy-set/components/trophy-set-page/trophy-set-page.component";

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'players', component: PlayersPageComponent},
    {path: 'profile/:playerId', component: ProfilePageComponent},
    {path: 'trophy-set/:trophySetId', component: TrophySetPageComponent},
    {path: 'error', component: ErrorPageComponent},
    {path: 'trophy-set-mapping-validation', component: ValidationPageComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', redirectTo: 'home'},
];
