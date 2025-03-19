import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Anime, AnimeService } from '../../services/anime/anime.service';
import { Observable, forkJoin } from 'rxjs';

export type AnimeWithSyn = { anime: Anime, synopsis: { synopsis: string }}

@Injectable({
  providedIn: 'root'
})
export class AnimeResolverService implements Resolve<AnimeWithSyn> {

  constructor(private animeService: AnimeService) { }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<AnimeWithSyn> {
      let malID = route.paramMap.get("malID") || "";
      return forkJoin({
          anime: this.animeService.fetchAnime(malID),
          synopsis: this.animeService.fetchSynopsis(malID),
      })   
  }
}
