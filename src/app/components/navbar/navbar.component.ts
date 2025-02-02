import { Component } from '@angular/core';
import { TranslatorPipe } from '../../pipes/translator/translator.pipe';

@Component({
	selector: 'app-navbar',
	imports: [ TranslatorPipe ],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	selected = "updates";

	navigate (page: string) {
		this.selected = page;
	}
}
