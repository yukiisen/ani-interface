import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../services/config/config.service';

export interface Note {
    id: number,
    anime_id: number,
    user: string,
    note: string
}

@Injectable({
    providedIn: 'root'
})
export class NotesService {
    constructor(private http: HttpClient, private config: ConfigService) { }

    getNotes(mal_id: number) {
        return this.http.get<Note[]>(`${this.config.API_URL}v1/notes/${mal_id}`);
    }
}
