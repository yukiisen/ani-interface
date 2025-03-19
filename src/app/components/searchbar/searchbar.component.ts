import { Component, Input } from '@angular/core';
import { TranslatorPipe } from '../../pipes/translator/translator.pipe';
import { ColorsService } from '../../services/colors/colors.service';

@Component({
    selector: 'app-searchbar',
    imports: [ TranslatorPipe ],
    templateUrl: './searchbar.component.html',
    styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
    inputFocused = false;
    mouseOnResults = false;
    @Input('page') currentSection = "updates";

    accentColor?: String;

    constructor (private colors: ColorsService) {
        this.colors.subscribe("searchbar", (color) => this.accentColor = `rgb(${color.join(",")})`);
    }
}
