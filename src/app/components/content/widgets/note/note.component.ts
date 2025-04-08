import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotesService, Note } from '../../../../services/notes/notes.service';
import { DialogManagerService } from '../../../../services/dialogs/dialog-manager.service';
import { TranslatorPipe } from '../../../../pipes/translator/translator.pipe';
import { ColorableDirective } from '../../../../directives/colorable.directive';

@Component({
    selector: 'app-note',
    imports: [ TranslatorPipe, ColorableDirective ],
    templateUrl: './note.component.html',
    styleUrl: './note.component.scss'
})
export class NoteComponent {
    @Input("note") data!: Note;
    @Output() deleted = new EventEmitter<null>;
    constructor (public dialog: DialogManagerService, private notesService: NotesService) {}

    async edit () {
        const note = await this.dialog.open("note-editor", this.data) as Note | null;
        
        if (note) {
            const result = await this.notesService.editNote(note);
            if (result) this.data = note;
            else alert("Failed For Some Reason");
        }
    }

    async delete () {
        const result = await this.notesService.deleteNote(this.data.id);

        if (result) this.deleted.next(null);
        else alert("Failed For Some Reason");
    }
}
