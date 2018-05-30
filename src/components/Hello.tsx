import * as React from 'react';
export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

export interface ITetromino {
    name: string;
    colour: string;
    layout: number[];
}

// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Tetromino implements ITetromino {
    public name: string; // I, L, J, O, Z, T, S, Make enum?
    public colour: string;
    public layout: number[];

    constructor(name: string, colour: string, northLayout: number, southLayout: number, eastLayout: number, westLayout: number) {
        this.name = name;
        this.colour = colour;
        this.layout.push(northLayout);
        this.layout.push(southLayout);
        this.layout.push(eastLayout);
        this.layout.push(westLayout);
    }


}

function Hello({ name, enthusiasmLevel = 1 }: IProps) {
    // var IShape = new Tetromino("I", "cyan", 0x0F00, 0x2222, 0x00F0, 0x4444);
    // var JShape = new Tetromino("J", "blue", 0x44C0, 0x8E00, 0x6440, 0x0E20);
    // var LShape = new Tetromino("L", "orange", 0x4460, 0x0E80, 0xC440, 0x2E00);
    // var OShape = new Tetromino("O", "yellow", 0xCC00, 0xCC00, 0xCC00, 0xCC00);
    // var SShape = new Tetromino("S", "green", 0x06C0, 0x8C40, 0x6C00, 0x4620);
    // var TShape = new Tetromino("T", "purple", 0x0E40, 0x4C40, 0x4E00, 0x4640);
    // var ZShape = new Tetromino("Z", "red", 0x0C60, 0x4C80, 0xC600, 0x2640);


    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel)}
            </div>
        </div>
    );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}