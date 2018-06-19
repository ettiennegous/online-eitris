import * as Enums from '../core/Enums'
export interface ITetromino {
    name: string;
    colour: Enums.Colours;
    layout: number;
    xpos: number;
    ypos: number;
    rotate(rotation: Enums.Rotation) : void;
    move(direction: Enums.Direction) : void;
}