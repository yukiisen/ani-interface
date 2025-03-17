import { Component } from '@angular/core';
import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-anime',
  imports: [ TranslatorPipe, CommonModule ],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent {

}
