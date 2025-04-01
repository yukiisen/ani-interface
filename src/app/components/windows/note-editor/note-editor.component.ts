import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from '../../../classes/dialog';
import { Note } from '../../../serivces/notes/notes.service';
import {DialogManagerService} from '../../../services/dialogs/dialog-manager.service';

@Component({
    selector: 'app-note-editor',
    imports: [],
    templateUrl: './note-editor.component.html',
    styleUrl: './note-editor.component.scss',
    host: {
        '[class.open]': 'opened'
    }
})
export class NoteEditorComponent implements Dialog<Note, Note> {
    @Input() input!: Note;
    @Input() opened = true;
    @Output() closed: EventEmitter<Note> = new EventEmitter;
    
    constructor (public manager: DialogManagerService) {}

    close () {
        console.log("Got: ", this.input);
        this.closed.next("Applepie!" as unknown as Note);
    }

    ngOnInit(): void {
        setTimeout(this.close.bind(this), 5000);
    }
}
