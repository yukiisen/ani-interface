import { Routes } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import { SeasonsComponent } from './components/content/seasons/seasons.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'seasons/:season', component: SeasonsComponent },
    { path: '**', redirectTo: "" }
];