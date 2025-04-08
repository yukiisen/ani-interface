import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Dialog } from '../../../classes/dialog';
import { Note } from '../../../services/notes/notes.service';
import { DialogManagerService } from '../../../services/dialogs/dialog-manager.service';
import { VimComponent } from '../../content/widgets/vim/vim.component';
import { ColorableDirective } from '../../../directives/colorable.directive';
import { TranslatorPipe } from '../../../pipes/translator/translator.pipe';
import { ColorsService } from '../../../services/colors/colors.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const enum State {
    New,
    Edit
}

@Component({
    selector: 'app-note-editor',
    imports: [ TranslatorPipe, VimComponent, ColorableDirective, CommonModule, FormsModule ],
    templateUrl: './note-editor.component.html',
    styleUrl: './note-editor.component.scss',
    host: {
        '[class.open]': 'opened'
    }
})
export class NoteEditorComponent implements Dialog<Note | number, Note | null>, OnInit, AfterViewInit {
    @Input() input!: Note | number;
    @Input() opened = true;
    @Output() closed: EventEmitter<Note | null> = new EventEmitter;

    state!: State;
    activeMode = "normal";
    output!: Note;

    @ViewChild("areainput") textArea?: ElementRef<HTMLTextAreaElement>;
    
    constructor (public manager: DialogManagerService, public colors: ColorsService) {}

    darken (color: number[], amount: number): string {
        return `rgb(${color.map(e => e - (e * (amount / 100))).join(",")})`;
    }

    close (save: boolean) {
        if (!save) return this.closed.next(null);
        localStorage.setItem('username', this.output.user);

        if (!this.output.user || !this.output.note) return alert("No data bruh!");
        this.closed.next(this.output);
    }

    ngOnInit(): void {
        this.state = typeof this.input == 'number' ? State.New : State.Edit;

        if (typeof this.input == 'number') this.output = { id: -1, anime_id: this.input, user: localStorage.getItem('username') || '', note: '' };
        else this.output = this.input;
    }

    ngAfterViewInit(): void {
        this.textArea?.nativeElement.focus();
    }
}
