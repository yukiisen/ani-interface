import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';
import { TranslationsService } from '../lang/translations.service';

export interface Anime {
    id: number,
    mal_id: number,
    local_name: string,
    title: string,
    title_english?: string,
    title_japanese?: string,
    type: string,
    source: string,
    episodes: number,
    status: string,
    aired_from: number,
    aired_to: number,
    duration: string,
    rating: string,
    score?: number,
    popularity: number,
    rank?: number,
    background: string,
    season?: string,
    year?: number,
    broadcast_day?: string,
    broadcast_time?: string,
    studio?: string,
    genres: string[],
    themes: string[],
}

export interface Episode {
    id: number,
    episode_number: number,
    title?: string,
    title_japanese?: string,
    title_english?: string,
    aired?: string,
    filler: boolean,
    recap: boolean,
    score?: number,
    file_name: string,
    watched: boolean,
    user_score?: number,
}

@Injectable({
    providedIn: 'root'
})
export class AnimeService {
    constructor(private http: HttpClient, private lang: TranslationsService, private config: ConfigService) {}
    
    fetchAnime (malID: string | number) {
        return this.http.get<Anime>(`${this.config.API_URL}v1/anime/${malID}`);
    }

    fetchSynopsis (malID: string | number) {
        return this.http.get<{ synopsis: string }>(`${this.config.API_URL}v1/synopsis/${malID}?lang=${this.lang.lang}`);
    }


    fetchEpisodes (malID: string | number) {
        return this.http.get<Episode[]>(`${this.config.API_URL}v1/anime/${malID}/episodes`);
    }
}
