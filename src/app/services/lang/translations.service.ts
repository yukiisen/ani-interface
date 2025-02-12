import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationsService {
    data: Record<string, string> = {}
    lang: string = "ar"
    direction: "ltr" | "rtl" = "ltr";

    constructor() { this.onInit() }

    async onInit() {
        try {
            const res = await fetch(`/lang/${this.lang}.json`);
            const data = await res.json();
            this.data = data.content;
            this.direction = data.direction;
        } catch (error) {
            this.lang = 'en';
            this.onInit();
        }
    }

    changeLanguage (lang: string) {
        this.lang = lang;
        this.onInit();
    }
}
