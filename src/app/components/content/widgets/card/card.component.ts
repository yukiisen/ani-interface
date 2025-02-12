import { Component, Input } from '@angular/core';
import { AnimeCard } from '../../../types/animecard';
import { TranslatorPipe } from '../../../../pipes/translator/translator.pipe';

@Component({
	selector: 'app-card',
	imports: [ TranslatorPipe ],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
})
export class CardComponent {
	@Input({ required: true }) data!: AnimeCard;
}