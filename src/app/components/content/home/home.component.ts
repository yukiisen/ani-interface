import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../widgets/card/card.component';
import { AnimeCard } from '../../types/animecard';

@Component({
	selector: 'app-home',
	imports: [ CommonModule, CardComponent ],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
	lastUpdates: AnimeCard[] = []

	constructor () {
		for (let i = 0; i < 23; i++) {
			this.lastUpdates.push({
				name: "Another",
				id: 6547,
				episodes: 12,
				status: "airing",
				score: 7.47
			})
		}
	}
}
