import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CardComponent } from '../widgets/card/card.component';
import { AnimeWithEp, FeedService } from '../../../services/feed/feed.service';

@Component({
	selector: 'app-updates',
	imports: [ CommonModule, CardComponent ],
	templateUrl: './updates.component.html',
	styleUrl: './updates.component.scss'
})
export class UpdatesComponent implements AfterViewInit {
	lastUpdates: AnimeWithEp[] = []
	private offset = 0
	private observer = new IntersectionObserver(this.onScroll.bind(this))

	@ViewChild('observer') span!: ElementRef;

	constructor (private feed: FeedService) {}

	ngAfterViewInit () {
		this.observer.observe(this.span.nativeElement);
	}
	
	async fetch() {
		const entries = await this.feed.getNewUpdates(this.offset);
		this.offset += entries.length;
		this.lastUpdates.push(...entries);
	}

	private onScroll (entries: IntersectionObserverEntry[]) {
		const intersections = entries.map((e) => e.isIntersecting);
		if (intersections.includes(true)) this.fetch();
	}
}
