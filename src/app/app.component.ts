import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { TranslationsService } from './services/lang/translations.service';
import { ColorsService } from './services/colors/colors.service';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
    selector: 'app-root',
    imports: [ RouterOutlet, NavbarComponent, SearchbarComponent, DialogComponent ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    host: {
        "[style.direction]": 'translation.direction'
    }
})
export class AppComponent {
    title = "updates"
    constructor (public translation: TranslationsService, private router: Router, private colors: ColorsService) {
        this.router.events.subscribe(ev => {
            if (ev instanceof NavigationStart) {
                this.colors.clearColor("searchbar");
            }
        });
    }
}
