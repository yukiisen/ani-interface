import { Component, Input, OnInit } from '@angular/core';
import { Relation } from '../../../../services/anime/anime.service';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../../services/config/config.service';
import { TranslatorPipe } from '../../../../pipes/translator/translator.pipe';
import { CommonModule } from '@angular/common';
import { ColorsService } from '../../../../services/colors/colors.service';

@Component({
    selector: 'app-relation',
    imports: [ RouterLink, TranslatorPipe, CommonModule ],
    templateUrl: './relation.component.html',
    styleUrl: './relation.component.scss'
})
export class RelationComponent implements OnInit {
    @Input({ required: true, alias: "relation" }) data!: Relation;
    relation!: string;
    anime!: Relation[1];

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
        this.relation = this.data[0];
        this.anime = this.data[1];
    }
}
