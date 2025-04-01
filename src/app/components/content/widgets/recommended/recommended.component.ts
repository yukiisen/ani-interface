import { Component, Input, OnInit } from '@angular/core';
import { Recommendation } from '../../../../services/anime/anime.service';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';
import { TranslatorPipe } from '../../../../pipes/translator/translator.pipe';
import { CommonModule } from '@angular/common';
import { ColorsService } from '../../../../services/colors/colors.service';

@Component({
    selector: 'app-recommendation',
    imports: [ RouterLink, TranslatorPipe, CommonModule ],
    templateUrl: './recommended.component.html',
    styleUrl: './recommended.component.scss'
})
export class RecommendationComponent implements OnInit {
    @Input({ required: true, alias: "recommendation" }) data!: Recommendation;
    votes!: Recommendation[0];
    anime!: Recommendation[1];

    accentColor?: string;

    constructor (public config: ConfigService, colors: ColorsService) {
        colors.subscribe("searchbar", (color) => {
            if (!color) return this.accentColor = undefined;
            this.accentColor = `rgb(${color.join(",")})`;
        });
        
        const color = colors.lastColor;
        if (color) {
            this.accentColor = `rgb(${color.join(",")})`;
        }
    }

    ngOnInit(): void {
        this.votes = this.data[0];
        this.anime = this.data[1];
    }
}
