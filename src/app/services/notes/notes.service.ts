import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../config/config.service';

export type Note = {
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


    async addNote (note: Note) {
        const res = await fetch(`${this.config.API_URL}v1/notes/add`, { 
            method: "POST", 
            body: JSON.stringify(note), 
            headers: { 
                'content-type': 'application/json' 
            } 
        });
        
        if (res.status == 200) return true;
        else return false;
    }

    async editNote (note: { id: number, note: string }) {
        const res = await fetch(`${this.config.API_URL}v1/notes/edit`, {
            method: "PATCH",
            body: JSON.stringify(note),
            headers: {
                'content-type': 'application/json'
            }
        });

        if (res.status == 200) return true;
        else return false;
    }

    async deleteNote (id: number) {
        const res = await fetch(`${this.config.API_URL}v1/notes/delete/${id}`, {
            method: "DELETE"
        });

        if (res.status == 200) return true;
        else return false;
    }
}
