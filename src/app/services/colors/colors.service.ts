import { Injectable } from '@angular/core';

export type Color = [number, number, number]

@Injectable({
    providedIn: 'root'
})
export class ColorsService {
    private channels: Record<string, ((color?: Color) => void)[]> = {};

    lastColor?: [ number, number, number ];

    constructor() { console.log(this) }

    getDominantColor (channel: string, img: HTMLImageElement) {
        return new Promise((res, rej) => {
            img.crossOrigin = "Anonymous";
            img.onload = (function (this: ColorsService) {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext("2d");
                
                if (!ctx) return rej("No context was found!");

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const colors = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

                const counter: Record<string, number> = {};

                for (let i = 0; i < colors.length; i += 4) {
                    const color = [ colors[i], colors[i+1], colors[i+2] ].map(e => Math.round(e / 40) * 40);
                    const colorTxt = color.join(",");
                    counter[colorTxt] = (counter[colorTxt] || 0) + 1;
                }

                const palette: Color[] = Object.entries(counter)
                    .sort((a, b) => b[1] - a[1])
                    .map<Color>(e => e[0].split(",").map(e => +e) as Color )
                    .filter((color) => color.filter(d => d >= 200).length < 1);
                
                const dominantColor = this.normalize(palette[1]);
                
                for (const call of this.channels[channel] || []) call(dominantColor);
                this.lastColor = dominantColor;

                res(dominantColor);
            }).bind(this);
        })
    }

    private normalize (color: Color): Color {
        if (color.filter(c => c <= 80).length > 1) return color.map(c => Math.min(255, c + 40)) as Color;
        else if (color.filter(c => c >= 200).length > 1) return color.map(c => Math.max(0, c - 60)) as Color;

        return color;
    }

    subscribe (channel: string, callback: (color?: Color) => void) {
        this.channels[channel] ??= [];
        this.channels[channel].push(callback);
    }

    clearColor (channel: string) {
        for (const call of this.channels[channel] || []) call();
    }
}
