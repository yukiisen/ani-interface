import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

export interface AnimeWithEp {
    anime_id: number,
    mal_id: number,
    local_name: string,
    title: string,
    type: string,
    episode_id: number,
    aired: string,
    episode_number: number,
    score?: number
}

export interface AnimeCard {
    mal_id: number,
    local_name: string,
    title: string,
    score: number
}

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    updates: AnimeWithEp[] = [];
    top: AnimeCard[] = [];
    private updatesOffset = 0;

    constructor(private config: ConfigService) {}

    async fetchUpdates () {
        const res = await fetch(`${this.config.API_URL}v1/updates/${this.updatesOffset}`);
        return await res.json() as AnimeWithEp[];
    }

    async getNewEntries() {
        const entries = await this.fetchUpdates()
        
        this.updates.push(...entries);
        this.updatesOffset += 20;
        
        return entries;
    }
    
}
