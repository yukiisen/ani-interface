import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    API_URL = "http://127.0.0.1:8080/";

    constructor() { }


    get static () { 
        return `${this.API_URL}static`; 
    }
}
