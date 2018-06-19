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
        this.xpos = 4;
        this.ypos = -4;
        this.orientation = Enums.Orientation.North;
    }

    get layout():number {
        return this.layouts[this.orientation];
    }

    public move(direction: Enums.Direction) {
        switch(direction)
        {
            case Enums.Direction.Down:
                this.ypos++;
            break;
            case Enums.Direction.Left:
                this.xpos--;
            break;
            case Enums.Direction.Right:
                this.xpos++;
            break;
        }
    }

    public rotate(rotation: Enums.Rotation) {
        if(rotation === Enums.Rotation.Clockwise) {
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