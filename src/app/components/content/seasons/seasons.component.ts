import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { TranslationsService } from '../../../services/lang/translations.service';
import { CardComponent } from '../widgets/card/card.component';
import { AnimeCard } from '../../types/animecard';

@Component({
	selector: 'app-seasons',
	imports: [ TranslatorPipe, CommonModule, CardComponent ],
	templateUrl: './seasons.component.html',
	styleUrl: './seasons.component.scss'
})
export class SeasonsComponent {
	tab: string;
	tabList: (keyof (typeof this.tabs))[]
	active: (keyof (typeof this.tabs)) = "Current Season"
	direction = "ltr";

	// maps the tabs with the corresponding pathnames.
	tabs = {
		"Previous Season": "previous",
		"Current Season": "current",
		"Next Season": "upcoming",
		"Other Seasons": "o"
	}

	animes: AnimeCard[] = [];

	constructor (route: ActivatedRoute, private router: Router, private translation: TranslationsService) {
		this.tab = route.snapshot.paramMap.get("season") || "current";
		this.tabList = Object.keys(this.tabs) as any;
		
		for (let i = 0; i < 23; i++) {
			this.animes.push({
				name: "Another",
				id: 6547,
				episodes: 12,
				status: "airing",
				score: 7.47
			})
		}

		if (translation.loaded) this.direction = translation.direction;
		else translation.onLoad.subscribe(() => {
			this.direction = translation.direction;
		});
	}

	navigate (path: string, tab: (keyof (typeof this.tabs))) {
		this.router.navigate(["seasons", path]);
		this.active = tab;
	}
}