import { EventEmitter, Injectable } from '@angular/core';

type Resolver = (value: unknown) => void

@Injectable({
    providedIn: 'root'
})
export class DialogManagerService {
    handler = new EventEmitter<[string, any, Resolver]>;
    constructor() {
        console.log(this);
    }

    open (window: string, params: any) {
        return new Promise((res, _) => {
            this.handler.next([window, params, res]);
        });
    }
}
