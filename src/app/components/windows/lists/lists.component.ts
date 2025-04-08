import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '../../../classes/dialog';
import { DialogManagerService } from '../../../services/dialogs/dialog-manager.service';
import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { ColorableDirective } from '../../../directives/colorable.directive';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-lists',
    imports: [ TranslatorPipe, CommonModule, ColorableDirective ],
    templateUrl: './lists.component.html',
    styleUrl: './lists.component.scss',
    host: {
        '[class.open]': 'opened'
    }
})
export class ListsComponent implements Dialog<number, void> {
    @Input() input!: number;
    @Input() opened: boolean = true;
    @Output() closed: EventEmitter<void> = new EventEmitter;

    constructor (public manager: DialogManagerService) {}

    ngOnInit(): void {
        
    }
}
