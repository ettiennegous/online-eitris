import { IGridCell } from './IGridCell'

export interface IGrid {
    width: number;
    height: number;
    cells: IGridCell[][];
    rows: number[];
}