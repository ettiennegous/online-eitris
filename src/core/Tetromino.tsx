import * as Enums from '../core/Enums'
import { Grid } from '../core/Grid'
import { IGrid } from '../core/IGrid'
import { ITetromino } from './ITetromino'

// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Tetromino implements ITetromino {
    public name: string; // I, L, J, O, Z, T, S, Make enum?
    public colour: Enums.Colours;
    public xpos: number;
    public ypos: number;
    public orientation: Enums.Orientation; // 0 North 1 East 3 South 4 West
    public tetrominoGrid: IGrid = new Grid(4, 4);
    private layouts: number[] = [];
    
    constructor(name: string, colour: Enums.Colours, northLayout: number, southLayout: number, eastLayout: number, westLayout: number) {
        this.name = name;
        this.colour = colour;
        this.layouts.push(northLayout);
        this.layouts.push(southLayout);
        this.layouts.push(eastLayout);
        this.layouts.push(westLayout);
        this.xpos = 0;
        this.ypos = 0;
        this.orientation = Enums.Orientation.North;
        this.calculateGrid();
    }

    get layout():number {
        return this.layouts[this.orientation];
    }

    public printGrid() : void {
        let result: string = '';
        this.tetrominoGrid.cells.map((column, columnCounter) => {
            column.map((cell, rowCounter) => {
                // Intentional switch of row and column, 
                // the X, Y notation is preffered but when rendering the blocks left to right one row after the next it needs to be row first
                result += this.tetrominoGrid.cells[rowCounter][columnCounter].isoccupied ? '1' : '0'; 
            })
            result += '\r\n';
        });
        console.log(result + '\r\n' + this.layout);
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
        this.calculateGrid();
    }

    private calculateGrid(): void {
        const binaryNotation = this.padStrLeft((this.layout >>> 0).toString(2), 16, '0'); // This will give a binary notation dump of the current block, this can be substringed per cell 0x4444 = 100010001000100
        // 0100 - Row 1
        // 0100 - Row 2
        // 0100 - Row 3 
        // 0100 - Row 4
        this.tetrominoGrid.cells.map((column, columnCounter) => {
            column.map((row, rowCounter) => {
                if(binaryNotation.substr(rowCounter * 4, 4).substr(columnCounter, 1) === "1") {
                    this.tetrominoGrid.cells[columnCounter][rowCounter].colour = this.colour;
                    this.tetrominoGrid.cells[columnCounter][rowCounter].isoccupied = true;
                }
                else {
                    this.tetrominoGrid.cells[columnCounter][rowCounter].isoccupied = false;
                    this.tetrominoGrid.cells[columnCounter][rowCounter].colour = Enums.Colours.Transparent;
                }
            });
        });
    }

    private padStrLeft(strToPad: string, width: number, paddingString: string) {
        paddingString = paddingString || '0';
        strToPad = strToPad + '';
        return strToPad.length >= width ? strToPad : new Array(width - strToPad.length + 1).join(paddingString) + strToPad;
    }
}