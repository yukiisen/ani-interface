import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
    data: Record<string, string> = {}
    lang: string = "ar"

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
