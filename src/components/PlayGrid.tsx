import * as React from 'react';
import * as Enums from '../core/Enums'
import { Grid } from '../core/Grid'
import { IGrid } from '../core/IGrid'
import { IGridCell } from '../core/IGridCell'
import { ITetromino } from '../core/ITetromino'
import { Tetromino } from '../core/Tetromino'

function PlayGrid() {
    const IShape = new Tetromino("I", Enums.Colours.Cyan, 0x4444, 0x00F0, 0x2222, 0x0F00);
    const JShape = new Tetromino("J", Enums.Colours.Blue, 0x44C0, 0x8E00, 0x6440, 0x0E20);
    const LShape = new Tetromino("L", Enums.Colours.Orange, 0x4460, 0x0E80, 0xC440, 0x2E00);
    const OShape = new Tetromino("O", Enums.Colours.Yellow, 0xCC00, 0xCC00, 0xCC00, 0xCC00);
    const SShape = new Tetromino("S", Enums.Colours.Green, 0x4620, 0x6C00, 0x8C40, 0x06C0);
    const TShape = new Tetromino("T", Enums.Colours.Purple, 0x4640, 0x0E40, 0x4C40, 0x4E00);
    const ZShape = new Tetromino("Z", Enums.Colours.Red, 0x2640, 0x0C60, 0x4C80, 0xC600);
    const shapes: ITetromino[] = [IShape, JShape, LShape, OShape, SShape, TShape, ZShape];
    // const currentBlock  = shapes[Math.floor(Math.random() * shapes.length - 1) + 0];
    const grid: IGrid = new Grid(10, 10);
    const theShape = ZShape;
    grid.height = 10;
    return (
        <div>
            {shapes.length}
            {renderColumnsAndRows(grid.cells, theShape)} 
            
        </div>
    );


}

function renderColumnsAndRows(cells: IGridCell[][], block: ITetromino) {
    return cells.map((row, rowCounter) => {    

        return (
        <div key={row[rowCounter].y} className="Row-wrapper"> 
            {
                row.map((column, columnCounter) => {
                return (<div key={column.x} className="Row-cell" style={{backgroundColor: RenderTetrimino(column.x, column.y, block)}}>{column.x}, {column.y}</div>);
                })
            }
        </div>);
    });
}

function RenderTetrimino(x: number, y: number, block: ITetromino) {
    // Assume North for now
    
    const binaryNotation = (block.layout >>> 0).toString(2); // This will give a binary notation dump of the current block, this can be substringed per cell 0x4444 = 100010001000100
    const paddedBinaryNotation = padStr(binaryNotation, 16, '0'); // = 0100010001000100
    // for(let x2:number = 0; x2 < 4; x2++) {
        // for(let y2:number = 0; y2 < 4; y2++) {
            // const binaryRow = paddedBinaryNotation.substr(y2 * 4, 4);
            // if(binaryRow.substr(x2, 1) === "1") { return block.colour; }
        // }
    // }
    const binaryRow = paddedBinaryNotation.substr(y * 4, 4);
    if(binaryRow.substr(x, 1) === "1") { return block.colour; }
    return Enums.Colours.Transparent;
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