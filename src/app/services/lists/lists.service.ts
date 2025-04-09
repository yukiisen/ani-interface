import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ConfigService } from '../config/config.service';

export interface UserList {
    id: number,
    name: string
}

export interface ListEntry {
    id: number,
    mal_id: number,
}

@Injectable({
    providedIn: 'root'
})
export class ListsService {
    constructor(private http: HttpClient, private config: ConfigService) { }

    getLists () {
        return this.http.get<UserList[]>(`${this.config.API_URL}v1/list/all`);
    }

    getAnimeLists () {
        return this.http.get<UserList[]>(`${this.config.API_URL}v1/list/entries/lists`);
    }

    async getListsAsync () {
        return await fetch(`${this.config.API_URL}v1/list/all`).then(res => res.json()) as UserList[];
    }

    async getListEntries (id: number): Promise<ListEntry[]> {
        return await fetch(`${this.config.API_URL}v1/list/entries/${id}`)
            .then(res => res.json()) // convert json to object
            .then(
                (json: number[][]) => json.map(json => ({ id: json[0], mal_id: json[1] })) // convert results to objects
            );
    }
}
