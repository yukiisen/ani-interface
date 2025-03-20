import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatorPipe } from '../../pipes/translator/translator.pipe';
import { ColorsService } from '../../services/colors/colors.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-navbar',
	imports: [ TranslatorPipe, CommonModule ],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
	selected: string = "home";
	accentColor: string = "";

	@Output("navigate") currentPage = new EventEmitter<string>;

	routingMap: Record<string, string> = {
		updates: "updates",
		home: "home",
		seasons: "seasons/current"
	}

	constructor (private router: Router, private colors: ColorsService) {}

	ngOnInit() {
		const path = location.pathname.split("/")[1];
		if (location.pathname == "/") this.selected = "home";
		else this.selected = Object.entries(this.routingMap).find(e => e[1] == path)?.[0] || path;
		this.currentPage.next(this.selected);


		// colors implementation
        this.colors.subscribe("searchbar", (color) => this.accentColor = `rgb(${color.join(",")})`);
	}

	navigateTo (page: string) {
		this.selected = page;
		this.currentPage.next(page);
		this.router.navigate([this.routingMap[page] || page]);
	}
}
