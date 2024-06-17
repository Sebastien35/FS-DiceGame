import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard'
import { GameComponent } from './game/game.component';
import { GameOverComponent } from './game-over/game-over.component';
import { ConnectComponent } from './connect/connect.component';
import { RegisterComponent } from './register/register.component';
import { ScoresComponent } from './scores/scores.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin.guard';
import { AdminScoresComponent } from './admin-scores/admin-scores.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

import { ErrorComponent } from './error/error.component';


export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {path: 'home', component: HomeComponent},
    { path: 'game', component: GameComponent},
    { path: 'game-over', component: GameOverComponent},
    { path: 'connect', component: ConnectComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'scores', component: ScoresComponent, canActivate: [AuthGuard]},


    { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
    { path: 'admin/scores', component: AdminScoresComponent, canActivate: [AdminGuard]},
    { path: 'admin/users', component: AdminUsersComponent, canActivate: [AdminGuard]},


    { path: 'error', component: ErrorComponent},


];
