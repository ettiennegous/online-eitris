import * as Enums from '../core/Enums'
import { IGrid } from './IGrid'

export interface ITetromino {
    
    name: string;
    colour: Enums.Colours;
    xpos: number;
    ypos: number;
    layout: number;
    tetrominoGrid: IGrid; 
    rotate(rotation: Enums.Rotation) : void;
    move(direction: Enums.Direction) : void;
    
}