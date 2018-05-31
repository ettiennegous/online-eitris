import * as React from 'react';
import { Grid } from '../core/Grid'
import { IGrid } from '../core/IGrid'
import { IGridCell } from '../core/IGridCell'
import { ITetromino } from '../core/ITetromino'
import { Tetromino } from '../core/Tetromino'
export interface IProps {
    name: string;
    enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: IProps) {
    const IShape = new Tetromino("I", "cyan", 0x0F00, 0x2222, 0x00F0, 0x4444);
    const JShape = new Tetromino("J", "blue", 0x44C0, 0x8E00, 0x6440, 0x0E20);
    const LShape = new Tetromino("L", "orange", 0x4460, 0x0E80, 0xC440, 0x2E00);
    const OShape = new Tetromino("O", "yellow", 0xCC00, 0xCC00, 0xCC00, 0xCC00);
    const SShape = new Tetromino("S", "green", 0x06C0, 0x8C40, 0x6C00, 0x4620);
    const TShape = new Tetromino("T", "purple", 0x0E40, 0x4C40, 0x4E00, 0x4640);
    const ZShape = new Tetromino("Z", "red", 0x0C60, 0x4C80, 0xC600, 0x2640);
    const shapes: ITetromino[] = [IShape, JShape, LShape, OShape, SShape, TShape, ZShape];
    
    const grid: IGrid = new Grid();
    grid.height = 10;
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <div className="hello">
            <div className="greeting">
                Hello {name + getExclamationMarks(enthusiasmLevel) + shapes.length}
            </div>
            {renderColumnsAndRows(grid.cells)}           
        </div>
    );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
    return Array(numChars + 1).join('!');
}

function renderColumnsAndRows(cells: IGridCell[][]) {
    cells.map((row, rowCounter) => {    
        row.map((column, columnCounter) => {     
        return (<p key={column.x}>{column.x}</p>);
    })});
}