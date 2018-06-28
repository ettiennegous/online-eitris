import * as Enums from '../core/Enums'
import { Grid } from '../core/Grid'
import { IGrid } from '../core/IGrid'
import { ITetromino } from './ITetromino'


interface IBitShiftResult { binaryRows: string[], isValid: boolean};
// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Tetromino implements ITetromino {

    public static padStrLeft(strToPad: string, width: number, paddingString: string) {
        paddingString = paddingString || '0';
        strToPad = strToPad + '';
        return strToPad.length >= width ? strToPad : new Array(width - strToPad.length + 1).join(paddingString) + strToPad;
    }

    public static padStrRight(strToPad: string, width: number, paddingString: string) {
        paddingString = paddingString || '0';
        strToPad = strToPad + '';
        return strToPad.length >= width ? strToPad : strToPad + new Array(width - strToPad.length + 1).join(paddingString);
    }


    public name: string; // I, L, J, O, Z, T, S, Make enum?
    public colour: Enums.Colours;
    public xpos: number;
    public ypos: number;
    public orientation: Enums.Orientation; // 0 North 1 East 3 South 4 West
    public tetrominoGrid: IGrid = new Grid(10, 10);
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
                result += this.tetrominoGrid.cells[columnCounter][rowCounter].isoccupied ? '1' : '0'; 
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
                if(this.bitMagic(this.layout, (this.xpos - 1)).isValid) {
                    this.xpos--;
                }
                
            break;
            case Enums.Direction.Right:
                if(this.bitMagic(this.layout, (this.xpos + 1)).isValid) {
                    this.xpos++;
                }
            break;
        }
        this.calculateGrid();
    }

    public rotate(rotation: Enums.Rotation) {
        if(rotation === Enums.Rotation.CounterClockWise) {
            console.log('cw' + this.xpos);
            if(this.orientation === 0) {
                this.orientation = 3;
            }
            else {
                this.orientation--;
            }

            // This happens when you rotate a piece of the edge of the grid 
            // and it swings outside of the play grid
            if(!this.bitMagic(this.layout, this.xpos).isValid) {
                this.xpos > 6 ? this.xpos-- : this.xpos++;
            }
        }

        
        this.calculateGrid();
    }

    public calculateGrid(): void {
        const binaryRows:string[] = this.bitMagic(this.layout, this.xpos).binaryRows;
        this.consoleLogBinaryRows(binaryRows);
        this.tetrominoGrid.cells.map((column, columnCounter) => {
            column.map((row, rowCounter) => {
                if(binaryRows[columnCounter] && binaryRows[columnCounter].split('')[rowCounter] === "1") {
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


    // 0100 - Row 1
    // 0100 - Row 2
    // 0100 - Row 3 
    // 0100 - Row 4
    private consoleLogBinaryRows(binaryRows: string[]) : void {
        let output = '';
        binaryRows.forEach((element, index) => {
            output += (element + '\r\n');
        });
        console.log(output + 'Done');
    }
    

    private convertToGridSizedArray(layout: number) : string[] {
        const newLength:string[] = [];
        let newLengthCounter = 0;
        const binaryNotation = Tetromino.padStrLeft((layout >>> 0).toString(2), 16, '0'); // This will give a binary notation dump of the current block, this can be substringed per cell 0x4444 = 100010001000100
        let binaryNotationTemp = binaryNotation;

        // Add extra rows on top as it moves down
        for(let a = 0; a < this.ypos; a++) {
            newLength[newLengthCounter] = Tetromino.padStrRight('', 10, '0');
            newLengthCounter++;
        }

        // Chop the string into 4 bit pieces for each row
        while(binaryNotationTemp.length) {
            
            newLength[newLengthCounter] = Tetromino.padStrRight(binaryNotationTemp.substr(0, 4), 10, '0');
            binaryNotationTemp = binaryNotationTemp.substr(4);            
            newLengthCounter++;
        }
        return newLength;
    }

    private bitMagic(layout: number, xpos: number) : IBitShiftResult {
        return this.bitShiftTetrominoPiece(this.convertToGridSizedArray(layout), xpos);
    }


    // Here be deamons, lots of bit magic
    private bitShiftTetrominoPiece(binaryRows: string[], xpos: number) : IBitShiftResult {
        let isValid = true;
        binaryRows.forEach((element, index) => {
            const charArray = element.split('');
            let indexToCheck = 0;
            let itteratorCount = 0;
            let arrActions;
            if(xpos > 0) {
                indexToCheck = charArray.length-1;
                itteratorCount = xpos;
                arrActions = (arr: string[]) : string[] => {
                    arr.pop();
                    arr.unshift('0');
                    return arr
                }
            }
            else {
                indexToCheck = 0;
                itteratorCount = Math.abs(xpos);
                arrActions = (arr: string[]) : string[] => {
                    arr.shift();
                    arr.push('0');
                    return arr;
                }
            }

            for(let a = 0; a < itteratorCount; a++) {
                if(charArray[indexToCheck] !== '1') {
                    binaryRows[index] = arrActions(charArray).join('');
                }
                else {
                    isValid = false;
                }
                
            }
        });
        const result : IBitShiftResult = { binaryRows, isValid };
        return result;
    }

    // private bitShiftTetrominoPiece2(binaryRows: string[], xpos: number, action: () => any) : string[] {

    // }


}