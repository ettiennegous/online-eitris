import { GridCell } from './GridCell'
import { IGrid } from './IGrid'
import { IGridCell } from './IGridCell'

// See this page that explains the binary block layout https://codeincomplete.com/posts/javascript-tetris/
export class Grid implements IGrid {
    public width: number; // I, L, J, O, Z, T, S, Make enum?
    public height: number;
    public cells: IGridCell[][];
    public rows: number[];

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.cells = [];
        for(let column = this.width - 1; column >= 0; column--)
        {
            this.cells[column] = []; 
            for(let row = 0; row < this.height; row++)    
            {
                this.cells[column][row] = new GridCell(column, row);
            }
        }
    }
}