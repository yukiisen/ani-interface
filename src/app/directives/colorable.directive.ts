import { Directive } from '@angular/core';
import { ColorsService } from '../services/colors/colors.service';

@Directive({
    selector: '[appColorable]',
    host: {
        '[style.background-color]': 'accentColor'
    }
})
export class ColorableDirective {

    accentColor: string;

    constructor(private colors: ColorsService) { 
        this.accentColor = `rgb(${this.colors.lastColor?.join(",")})`;
        this.colors.subscribe('searchbar', (color) => this.accentColor = `rgb(${color?.join(",")})`)
    }

}
