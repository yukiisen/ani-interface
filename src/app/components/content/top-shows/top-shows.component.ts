import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FeedService, AnimeCard } from '../../../services/feed/feed.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../widgets/card/card.component';

@Component({
    selector: 'app-top-shows',
    imports: [ CommonModule, CardComponent ],
    templateUrl: './top-shows.component.html',
    styleUrl: './top-shows.component.scss'
})
export class TopShowsComponent implements AfterViewInit {
    topShows: AnimeCard[] = []
	private offset = 0
	private observer = new IntersectionObserver(this.onScroll.bind(this))

	@ViewChild('observer') span!: ElementRef;

	constructor (private feed: FeedService) {}

	ngAfterViewInit () {
		this.observer.observe(this.span.nativeElement);
	}
	
	async fetch() {
		const entries = await this.feed.getTopAnimes(this.offset);
		this.offset += entries.length;
		this.topShows.push(...entries);
	}

	private onScroll (entries: IntersectionObserverEntry[]) {
		const intersections = entries.map((e) => e.isIntersecting);
		if (intersections.includes(true)) this.fetch();
	}

}
