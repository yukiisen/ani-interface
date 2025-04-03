import { Directive } from '@angular/core';
import { Color, ColorsService } from '../services/colors/colors.service';

@Directive({
    selector: '[appColorable]',
    host: {
        '[style.background-color]': 'accentColor',
        '[style.border]': '"3px solid red"',
        '[style.border-color]': 'borderColor',
    }
})
export class ColorableDirective {

    accentColor: string;
    borderColor: string;

    constructor(private colors: ColorsService) { 
        this.accentColor = `rgb(${this.colors.lastColor?.join(",")})`;
        this.borderColor = `rgb(${this.darken(this.colors.lastColor || [0, 0, 0], 20).join(",")})`;
        this.colors.subscribe('searchbar', (color) => {
            this.accentColor = `rgb(${color?.join(",")})`;
            this.borderColor = `rgb(${this.darken(color || [0, 0, 0], 20).join(",")})`;
        })
    }
    
    darken (color: Color, amount: number): Color {
        return color.map(e => e + (e * (amount / 100))).map(e => this.between(e, 255, 0)) as Color;
    }

    between (numb: number, max: number, min: number): number {
        return Math.max(min, Math.min(numb, max));
    }
}
