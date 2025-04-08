import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TranslationsService {
    data: Record<string, string> = {}
    lang: string = "ar";
    direction: "ltr" | "rtl" = "ltr"
    loaded = false;
    onLoad = new EventEmitter<void>

    constructor() { this.onInit() }

    async onInit() {
        try {
            const res = await fetch(`/lang/${this.lang}.json`);
            const data = await res.json();
            this.data = data.content;
            this.direction = data.direction;
            this.onLoad.emit();
            this.loaded = true;
        } catch (error) {
            console.error(error);
            this.lang = 'en';
            this.onInit();
        }
    }

    changeLanguage (lang: string) {
        this.lang = lang;
        this.onInit();
    }
}
