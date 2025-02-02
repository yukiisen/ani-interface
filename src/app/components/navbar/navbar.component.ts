import { Component, Output, EventEmitter } from '@angular/core';
import { TranslatorPipe } from '../../pipes/translator/translator.pipe';

@Component({
	selector: 'app-navbar',
	imports: [ TranslatorPipe ],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	selected = "updates";
	@Output() navigate = new EventEmitter;

	navigateTo (page: string) {
		this.selected = page;
		this.navigate.next(page);
	}
}
