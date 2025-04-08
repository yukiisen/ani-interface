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
    score: number,
    status: string
}

@Injectable({
    providedIn: 'root'
})
export class FeedService {
    updates: AnimeWithEp[] = [];
    top: AnimeCard[] = [];
    private updatesOffset = 0;
    private topOffset = 0;

    constructor(private config: ConfigService) {}

    async fetchUpdates () {
        const res = await fetch(`${this.config.API_URL}v1/updates/${this.updatesOffset}`);
        return await res.json() as AnimeWithEp[];
    }

    async fetchTop () {
        const res = await fetch(`${this.config.API_URL}v1/top?limit=20&offset=${this.topOffset}`);
        return await res.json() as AnimeCard[];
    }

    async getNewUpdates(offset: number) {
        if (offset < this.updates.length - 1) return this.updates.slice(offset, offset + 20)

        const entries = await this.fetchUpdates();
        
        this.updates.push(...entries);
        this.updatesOffset += entries.length;
        
        return entries;
    }

    async getTopAnimes (offset: number) {
        if (offset < this.top.length - 1) return this.top.slice(offset, offset + 20)

        const entries = await this.fetchTop();
        
        this.top.push(...entries);
        this.topOffset+= entries.length;
        
        return entries;
    }
}
