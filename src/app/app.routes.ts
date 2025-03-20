import { Routes } from '@angular/router';
import { HomeComponent } from './components/content/home/home.component';
import { SeasonsComponent } from './components/content/seasons/seasons.component';
import { AnimeComponent } from './components/content/anime/anime.component';
import { UpdatesComponent } from './components/content/updates/updates.component';
import { AnimeResolverService } from './resolvers/anime/anime.resolver.service';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'updates', component: UpdatesComponent },
    { path: 'seasons/:season', component: SeasonsComponent },
    { path: 'anime/:malID', component: AnimeComponent, resolve: { anime: AnimeResolverService } },
    { path: '**', redirectTo: "" }
];
