import {CommonModule} from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../widgets/card/card.component';
import { AnimeCard } from '../../types/animecard';

@Component({
  selector: 'app-updates',
  imports: [ CommonModule, CardComponent ],
  templateUrl: './updates.component.html',
  styleUrl: './updates.component.scss'
})
export class UpdatesComponent {
	lastUpdates: AnimeCard[] = []

	constructor () {
		for (let i = 0; i < 15; i++) {
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
