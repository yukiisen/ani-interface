import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '../../../classes/dialog';
import { DialogManagerService } from '../../../services/dialogs/dialog-manager.service';
import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { ColorableDirective } from '../../../directives/colorable.directive';
import { CommonModule } from '@angular/common';
import { ListsService, UserList } from '../../../services/lists/lists.service';
import { Observable } from 'rxjs';

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

    lists$!: Observable<UserList[]>;

    constructor (public manager: DialogManagerService, private userlists: ListsService) {}

    ngOnInit(): void {
        this.lists$ = this.userlists.getLists();
    }
}
