import * as Enums from '../core/Enums'
import { ITetromino } from './ITetromino'

// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Tetromino implements ITetromino {
    public name: string; // I, L, J, O, Z, T, S, Make enum?
    public colour: Enums.Colours;
    public xpos: number;
    public ypos: number;
    public orientation: Enums.Orientation; // 0 North 1 East 3 South 4 West
    private layouts: number[] = [];

    constructor(name: string, colour: Enums.Colours, northLayout: number, southLayout: number, eastLayout: number, westLayout: number) {
        this.name = name;
        this.colour = colour;
        this.layouts.push(northLayout);
        this.layouts.push(southLayout);
        this.layouts.push(eastLayout);
        this.layouts.push(westLayout);
        this.xpos = 5;
        this.ypos = 0;
        this.orientation = Enums.Orientation.North;
    }

    get layout():number {
        return this.layouts[this.orientation];
    }

    public rotate(direction: Enums.Rotation) {
        if(direction === Enums.Rotation.Clockwise) {
           if(this.orientation === 3) {
            this.orientation = 0;
           }
           else {
            this.orientation++;
           }
        }
        else {
            if(this.orientation === 0) {
                this.orientation = 3;
               }
               else {
                this.orientation--;
               }
        }
    }
}