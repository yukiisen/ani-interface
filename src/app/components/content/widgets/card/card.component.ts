import { Component, Input } from '@angular/core';
import { TranslatorPipe } from '../../../../pipes/translator/translator.pipe';
import { AnimeWithEp } from '../../../../services/feed/feed.service';
import { ConfigService } from '../../../../services/config/config.service';
import { CommonModule } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
	selector: 'app-card',
	imports: [ TranslatorPipe, CommonModule, RouterLink ],
	templateUrl: './card.component.html',
	styleUrl: './card.component.scss',
})
export class CardComponent {
	@Input({ required: true }) data!: AnimeWithEp | any;
	@Input() mode: "season" | "episode" = "season";

	constructor (public config: ConfigService) {}

	imagePath () {
		return `url('${this.config.static}/${this.data.local_name.replaceAll(' ', '_')}.webp')`;
	}
}
