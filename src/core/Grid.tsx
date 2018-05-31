import { GridCell } from './GridCell'
import { IGrid } from './IGrid'
import { IGridCell } from './IGridCell'

// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Grid implements IGrid {
    public width: number; // I, L, J, O, Z, T, S, Make enum?
    public height: number;
    public cells: IGridCell[][];
    public rows: number[];

    constructor() {
        this.width = 10;
        this.height = 10;
        this.cells = [];
        for(let row = 0; row < this.height; row++)
        {
            this.cells[row] = [];
            for(let column = 0; column < this.width; column++)
            {
                this.cells[row][column] = new GridCell(row, column);
            }
        }
    }
}