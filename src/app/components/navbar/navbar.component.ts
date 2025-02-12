import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
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

	constructor (private router: Router) {}

	navigateTo (page: string) {
		this.selected = page;
		this.navigate.next(page);
		this.router.navigate([page]);
	}
}
