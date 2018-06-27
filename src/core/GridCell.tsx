import { IGridCell } from './IGridCell'

export class GridCell implements IGridCell {
    public x: number;
    public y: number;
    public isoccupied: boolean;
    public colour: string;

    constructor(column:number, row:number) {
        this.x = column
        this.y = row
        this.isoccupied = false;
        this.colour = "transparent";
    }
}