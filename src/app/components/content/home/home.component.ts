import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../widgets/card/card.component';

@Component({
	selector: 'app-home',
	imports: [ CommonModule, CardComponent ],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent {
}
