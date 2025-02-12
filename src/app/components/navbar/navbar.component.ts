import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatorPipe } from '../../pipes/translator/translator.pipe';

@Component({
	selector: 'app-navbar',
	imports: [ TranslatorPipe ],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
	selected: string = "";
	@Output("navigate") currentPage = new EventEmitter<string>;

	routingMap: { [ key: string ]: string } = {
		updates: "home",
		seasons: "seasons/current"
	}

	constructor (private router: Router) {}

	ngOnInit() {
		const path = location.pathname.split("/")[1];
		if (location.pathname == "/") this.selected = "updates";
		else this.selected = Object.entries(this.routingMap).find(e => e[1] == path)?.[0] || path;
		this.currentPage.next(this.selected);
	}

	navigateTo (page: string) {
		this.selected = page;
		this.currentPage.next(page);
		this.router.navigate([this.routingMap[page] || page]);
	}
}
