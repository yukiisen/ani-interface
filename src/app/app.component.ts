import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { TranslationsService } from './services/lang/translations.service';

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, NavbarComponent, SearchbarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    "[class.rtl]": 'this.translation.lang == "ar"'
  }
})
export class AppComponent {
  title = "updates"
  constructor (private translation: TranslationsService) {}
}
