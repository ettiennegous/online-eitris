import { IGridCell } from './IGridCell'

export class GridCell implements IGridCell {
    public x: number;
    public y: number;
    public isoccupied: boolean;
    public colour: string;

    constructor(row:number, column:number) {
        this.x = column
        this.y = row
        this.isoccupied = false;
        this.colour = "transparent";
    }
}