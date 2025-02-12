import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { TranslationsService } from '../../../services/lang/translations.service';

@Component({
	selector: 'app-seasons',
	imports: [ TranslatorPipe, CommonModule ],
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

	constructor (route: ActivatedRoute, private router: Router, private translation: TranslationsService) {
		this.tab = route.snapshot.paramMap.get("season") || "current";
		this.tabList = Object.keys(this.tabs) as any;

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