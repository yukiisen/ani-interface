import { Injectable } from '@angular/core';

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
    constructor() { }
}
