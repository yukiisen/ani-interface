import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '../../../classes/dialog';
import { Note } from '../../../serivces/notes/notes.service';
import { DialogManagerService } from '../../../services/dialogs/dialog-manager.service';
import { VimComponent } from '../../content/widgets/vim/vim.component';
import { ColorableDirective } from '../../../directives/colorable.directive';
import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { ColorsService } from '../../../services/colors/colors.service';
import { CommonModule } from '@angular/common';

enum State {
    New,
    Edit
}

@Component({
    selector: 'app-note-editor',
    imports: [ TranslatorPipe, VimComponent, ColorableDirective, CommonModule ],
    templateUrl: './note-editor.component.html',
    styleUrl: './note-editor.component.scss',
    host: {
        '[class.open]': 'opened'
    }
})
export class NoteEditorComponent implements Dialog<Note | null, Note> {
    @Input() input!: Note | null;
    @Input() opened = true;
    @Output() closed: EventEmitter<Note> = new EventEmitter;

    state: State = this.input? State.Edit : State.New

    activeMode = "vim";
    
    constructor (public manager: DialogManagerService, public colors: ColorsService) {}

    darken (color: number[], amount: number): string {
        return `rgb(${color.map(e => e - (e * (amount / 100))).join(",")})`;
    }

    close () {
    }

    ngOnInit(): void {
    }
}
