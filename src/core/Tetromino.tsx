import { ITetromino } from './ITetromino'
// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Tetromino implements ITetromino {
    public name: string; // I, L, J, O, Z, T, S, Make enum?
    public colour: string;
    public layout: number[] = [];
    public xpos: number;
    public ypos: number;
    public orientation: number; // 0 North 1 East 3 South 4 West

    constructor(name: string, colour: string, northLayout: number, southLayout: number, eastLayout: number, westLayout: number) {
        this.name = name;
        this.colour = colour;
        this.layout.push(northLayout);
        this.layout.push(southLayout);
        this.layout.push(eastLayout);
        this.layout.push(westLayout);
        this.xpos = 5;
        this.ypos = 0;

    }
}