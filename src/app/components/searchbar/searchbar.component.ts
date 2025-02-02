import { Component } from '@angular/core';
import { TranslatorPipe } from '../../pipes/translator/translator.pipe';

@Component({
  selector: 'app-searchbar',
  imports: [ TranslatorPipe ],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {

}
