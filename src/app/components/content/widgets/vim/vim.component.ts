import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorsService } from '../../../../services/colors/colors.service';

function BindNormal(...keys: string[]): MethodDecorator {
    return (target, _propertyKey, descriptor) => {
        if (!descriptor.value) return descriptor;

        target.constructor.prototype.keyBindings ??= new Map;

        const map: Map<string, (key: string) => void> = target.constructor.prototype.keyBindings;

        keys.forEach(key => map.set(key, descriptor.value as (key: string) => void));

        return descriptor;
    }
}

@Component({
    selector: 'app-vim',
    imports: [ CommonModule ],
    templateUrl: './vim.component.html',
    styleUrl: './vim.component.scss'
})
export class VimComponent implements OnInit {
    @Input() value = `:host {
    display: flex;
    width: 100%;
    height: 100%;

    user-select: none;

    flex-direction: column;

    overflow-x: auto;

    * { 
        font-family: "Jetbrains Mono"; 
        transition-duration: 0ms; 
    }
}`;

    constructor (public colors: ColorsService) {}

    data: string[][] = [];
    selected: [number, number] = [0, 0];

    keyBindings: Map<string, (key: string) => void> = new Map(VimComponent.prototype.keyBindings);

    mode: "visual" | "normal" | "insert" = "normal";

    abs = Math.abs;

    ngOnInit(): void {
        let lines = this.value.split(/\n/g);

        lines.forEach(line => {
            this.data.push(line.split(""));
        });

        document.addEventListener("keydown", this.initKeyBindings.bind(this));
    }

    getColor () {
        return `rgb(${this.colors.lastColor?.join(",")})`;
    }

    initKeyBindings (e: KeyboardEvent) {
        let command = '';

        if (e.ctrlKey) command += 'Ctrl+';
        if (e.altKey) command += 'Alt+';
        if (e.metaKey) command += 'Meta+';

        command += e.key;

        if (this.keyBindings.has(command)) e.preventDefault();
        else return;

        this.keyBindings.get(command)?.bind(this)(command);
    }

    private get currentLine () {
        return this.data[this.selected[0]];
    }

    private between (numb: number, max: number, min: number): number {
        return Math.max(min, Math.min(numb, max));
    }

    private nextLetter(pos: [number, number]): [number, number] {
        if (pos[1] + 1 == this.data[pos[0]].length && this.data.length > pos[0] + 1) return [ pos[0] + 1, 0 ];
        else if (pos[1] + 1 < this.data[pos[0]].length) return [ pos[0], pos[1] + 1 ];
        else return pos.map(e => e) as [number, number];
    }

    private prevLetter(pos: [number, number]): [number, number] {
        if (pos[1] - 1 < 0 && pos[0] > 0) return [ pos[0] - 1, this.data[pos[0] - 1].length - 1 ];
        else if (pos[1] - 1 >= 0) return [ pos[0], pos[1] - 1 ];
        else return pos.map(e => e) as [number, number];
    }

    private letterAt (pos: [number, number]): string {
        return this.data[pos[0]][pos[1]];
    }

    private samePos <T extends [number, number]>(pos1: T, pos2: T): boolean {
        return pos1[0] == pos2[0] && pos1[1] == pos2[1];
    }

    @BindNormal("j", "k", "ArrowUp", "ArrowDown")
    moveCursorVertically(key: "j" | "k" | "ArrowUp" | "ArrowDown") {
        let direction = key == "j" || key == "ArrowDown"? 1: -1;

        this.selected[0] = this.between(this.selected[0] + direction, this.data.length - 1, 0);
        if (this.currentLine.length == 0) this.currentLine.push(" ");
        this.selected[1] = Math.min(this.selected[1], this.currentLine.length - 1);
    }

    @BindNormal("h", "l", "ArrowLeft", "ArrowRight")
    moveCursorHorizontally(key: "h" | "l" | "ArrowLeft" | "ArrowRight") {
        let direction = key == "h" || key == "ArrowLeft"? -1 : 1;

        this.selected[1] = this.between(this.selected[1] + direction, this.currentLine.length - 1, 0);
    }

    @BindNormal("_")
    moveToFirstWord(_: string) {
        let line = this.data[this.selected[0]];
        let index = 0;
        while (line[index] == ' ') ++index;

        this.selected[1] = index;
    }
    
    @BindNormal("$")
    moveToLastLetter(_: string) {
        this.selected[1] = this.currentLine.length - 1;
    }

    @BindNormal("w", "b")
    moveWord(key: "w" | "b") {
        const moveMethod = key == "w" ? this.nextLetter.bind(this) : this.prevLetter.bind(this);

        let currentLetter = this.letterAt(this.selected);

        if (!currentLetter) {
            this.data[this.selected[0]].push(" ");
            currentLetter = " ";
        }

        let pos = this.selected.map(e => e) as [number, number];

        let matcher;
        
        if ((/[a-z0-9]/gi).test(currentLetter)) matcher = /[^a-z0-9]/gi;
        else matcher = /[^ ]/gi;

        while (!matcher.test(this.letterAt(moveMethod(pos))) && !this.samePos(pos, moveMethod(pos))) pos = moveMethod(pos);

        if (/[a-z0-9]/gi.test(currentLetter)) {
            matcher = /[^ ]/gi;
            while (!matcher.test(this.letterAt(moveMethod(pos))) && !this.samePos(pos, moveMethod(pos))) pos = moveMethod(pos);
        }

        if (key == "b") {
            while (/[a-z0-9]/gi.test(this.letterAt(moveMethod(moveMethod(pos)))) && !this.samePos(pos, moveMethod(pos))) pos = moveMethod(pos);
        }

        this.selected = moveMethod(pos);
    }

    @BindNormal("W", "B")
    moveBigWord(key: "W" | "B") {
        const moveMethod = key == "W" ? this.nextLetter.bind(this) : this.prevLetter.bind(this);

        let currentLetter = this.letterAt(this.selected);

        if (!currentLetter) {
            this.data[this.selected[0]].push(" ");
            currentLetter = " ";
        }

        let pos = this.selected.map(e => e) as [number, number];

        const matcher = /\ /gi;
        while (!matcher.test(this.letterAt(moveMethod(pos))) && !this.samePos(pos, moveMethod(pos))) pos = moveMethod(pos);

        const matcherTwo = /[^ ]/gi
        while (!matcherTwo.test(this.letterAt(moveMethod(pos))) && !this.samePos(pos, moveMethod(pos))) pos = moveMethod(pos);

        if (key == "B") {
            while (matcherTwo.test(this.letterAt(moveMethod(moveMethod(pos)))) && !this.samePos(pos, moveMethod(pos))) pos = moveMethod(pos);
        }

        this.selected = moveMethod(pos);
    }
}
