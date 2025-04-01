import { EventEmitter, OnInit } from "@angular/core";
import { DialogManagerService } from "../services/dialogs/dialog-manager.service";

export interface Dialog<I, O> extends OnInit {
    closed: EventEmitter<O>,
    input: I,
    opened: boolean,
    manager: DialogManagerService,
}
