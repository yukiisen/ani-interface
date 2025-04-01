import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { Relation, Episode, Anime, AnimeService, Recommendation } from '../../../services/anime/anime.service';
import { ConfigService } from '../../../services/config/config.service';
import { ColorsService } from '../../../services/colors/colors.service';

import { RelationComponent } from '../widgets/relation/relation.component';
import { RecommendationComponent } from '../widgets/recommended/recommended.component';

@Component({
  selector: 'app-anime',
  imports: [ TranslatorPipe, CommonModule, RelationComponent, RecommendationComponent ],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent implements OnInit, AfterViewInit {
    anime: Anime = {} as Anime;
    episodes$!: Observable<Episode[]>;
    relation$!: Observable<Relation[]>;
    recommendations$!: Observable<Recommendation[]>;
    episodeDuraion: string[] = [];
    synopsis: string = '';
    API_URL: string;

    @ViewChild("poster") img!: ElementRef<HTMLImageElement>;

    synExpand = false;

    constructor (private route: ActivatedRoute, public config: ConfigService, private colors: ColorsService, private animeService: AnimeService) {
        this.API_URL = config.API_URL;

        route.data.subscribe(({ anime }) => {
            this.anime = anime;
            this.ngOnInit();
            window.scrollTo(0, 0);
        })
    }

    ngOnInit(): void {
        this.anime = this.route.snapshot.data['anime'].anime; // retrieve data from route
        this.anime.season = this.anime.season?.replace(/\b\w/g, (match: string) => match.toUpperCase()); // reformat data
        this.anime.rating = this.anime.rating.match(/[0-9]+/i)?.[0] || "";
        this.episodeDuraion = this.anime.duration.match(/[0-9]+/gi)?.reverse() || [];

        this.synopsis = this.route.snapshot.data['anime'].synopsis.synopsis || "";

        this.episodes$ = this.animeService.fetchEpisodes(this.anime.mal_id);
        this.relation$ = this.animeService.fetchRelations(this.anime.mal_id);
        this.recommendations$ = this.animeService.fetchRecommendations(this.anime.mal_id);
    }

    ngAfterViewInit(): void {
        this.colors.getDominantColor("searchbar", this.img.nativeElement);
    }

    // Used to sort episodes after they're fetched
    sortEps (a: Episode, b: Episode) {
        return a.episode_number - b.episode_number;
    }
}
