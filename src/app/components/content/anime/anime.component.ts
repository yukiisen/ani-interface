import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Episode, Anime, AnimeService } from '../../../services/anime/anime.service';
import { ConfigService } from '../../../services/config/config.service';
import { ColorsService } from '../../../services/colors/colors.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anime',
  imports: [ TranslatorPipe, CommonModule ],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent implements OnInit, AfterViewInit {
    anime: Anime = {} as Anime;
    episodes$!: Observable<Episode[]>;
    episodeDuraion: string[] = [];
    synopsis: string = '';
    API_URL: string;

    @ViewChild("poster") img!: ElementRef;

    synExpand = false;

    constructor (private route: ActivatedRoute, public config: ConfigService, private colors: ColorsService, private animeService: AnimeService) {
        this.API_URL = config.API_URL;
    }

    ngOnInit(): void {
        this.anime = this.route.snapshot.data['anime'].anime; // retrieve data from route
        this.anime.season = this.anime.season?.replace(/\b\w/g, (match: string) => match.toUpperCase()); // reformat data
        this.anime.rating = this.anime.rating.match(/[0-9]+/i)?.[0] || "";
        this.episodeDuraion = this.anime.duration.match(/[0-9]+/gi)?.reverse() || [];

        this.synopsis = this.route.snapshot.data['anime'].synopsis.synopsis || "";

        this.episodes$ = this.animeService.fetchEpisodes(this.anime.mal_id);
    }

    ngAfterViewInit(): void {
        this.colors.getDominantColor("searchbar", this.img.nativeElement);
    }

    // Used to sort episodes after they're fetched
    sortEps (a: Episode, b: Episode) {
        return a.episode_number - b.episode_number;
    }
}
