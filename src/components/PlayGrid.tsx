import * as React from 'react';
import { Grid } from '../core/Grid'
import { IGrid } from '../core/IGrid'
import { IGridCell } from '../core/IGridCell'
import { ITetromino } from '../core/ITetromino'
import { Tetromino } from '../core/Tetromino'


function PlayGrid() {
    const IShape = new Tetromino("I", "cyan", 0x0F00, 0x2222, 0x00F0, 0x4444);
    const JShape = new Tetromino("J", "blue", 0x44C0, 0x8E00, 0x6440, 0x0E20);
    const LShape = new Tetromino("L", "orange", 0x4460, 0x0E80, 0xC440, 0x2E00);
    const OShape = new Tetromino("O", "yellow", 0xCC00, 0xCC00, 0xCC00, 0xCC00);
    const SShape = new Tetromino("S", "green", 0x06C0, 0x8C40, 0x6C00, 0x4620);
    const TShape = new Tetromino("T", "purple", 0x0E40, 0x4C40, 0x4E00, 0x4640);
    const ZShape = new Tetromino("Z", "red", 0x0C60, 0x4C80, 0xC600, 0x2640);
    const shapes: ITetromino[] = [IShape, JShape, LShape, OShape, SShape, TShape, ZShape];
    // const currentBlock  = shapes[Math.floor(Math.random() * shapes.length - 1) + 0];
    const grid: IGrid = new Grid(10, 10);
    grid.height = 10;

    return (
        <div>
            {shapes.length}
            {renderColumnsAndRows(grid.cells, IShape)} 
            {RenderTetrimino(0, 0, IShape)}
        </div>
    );


}

function renderColumnsAndRows(cells: IGridCell[][], block: ITetromino) {
    return cells.map((row, rowCounter) => {    
        return (
        <div key={row[rowCounter].y} className="Row-wrapper"> 
            {
                row.map((column, columnCounter) => {     
                return (<div key={column.x} className="Row-cell">{column.x}, {column.y}</div>);
                })
            }
        </div>);
    });
}

function RenderTetrimino(x: number, y: number, block: ITetromino) {
    // Assume North for now
    const binaryNotation = (block.layout[0] >>> 0).toString(2); // This will give a binary notation dump of the current block, this can be substringed per cell 0x4444 = 100010001000100
    const paddedBinaryNotation = padStr(binaryNotation, 16, '0'); // = 0100010001000100
    for(let x2:number = 0; x2 < 4; x2++) {
        for(let y2:number = 0; y2 < 4; y2++) {
            const binaryRow = paddedBinaryNotation.substr(y2 * 4, 4);
            console.log(binaryRow.substr(x2, 1));
        }
        console.log('New Y');
    }

    // 0100010001000100 
    // 0,4
    // 4,4
    // 8,4
    // 12,4
    // console.log();
}

function padStr(strToPad: string, width: number, paddingString: string) {
    paddingString = paddingString || '0';
    strToPad = strToPad + '';
    return strToPad.length >= width ? strToPad : new Array(width - strToPad.length + 1).join(paddingString) + strToPad;
  }

export default PlayGrid;