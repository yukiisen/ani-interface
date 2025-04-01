import { Component } from '@angular/core';
import { NoteEditorComponent } from '../windows/note-editor/note-editor.component';
import { DialogManagerService } from '../../services/dialogs/dialog-manager.service';
import {CommonModule} from '@angular/common';

@Component({
    selector: 'app-dialog',
    imports: [ NoteEditorComponent, CommonModule ],
    templateUrl: './dialog.component.html',
    styleUrl: './dialog.component.scss',
    host: {
        '[class.visible]': 'visible'
    }
})
export class DialogComponent {
    activeWindow?: string;
    input: any;
    open = false;

    visible = false;

    private responder = (_value: unknown) => {};

    constructor (private manager: DialogManagerService) {
        this.manager.handler.subscribe(([window, input, done]) => {
            this.activeWindow = window;
            this.input = input;
            this.responder = done;

            console.log(this);

            this.visible = true;
            setTimeout(() => { this.open = true }, 10);
        });
    }

    onClose (ev: any) {
        this.responder(ev);
        this.open = false;
        setTimeout(() => { this.visible = false }, 100);
    }
}
