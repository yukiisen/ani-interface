import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
    data: Record<string, string> = {}
    lang: string = "ar"
    thing: any = 5

    constructor() { this.onInit() }

    async onInit() {
        let res = await fetch(`/lang/${this.lang}.json`);
        this.data = await res.json();
    }

    changeLanguage (lang: string) {
        this.lang = lang;
        this.onInit();
    }

}
