import * as React from 'react';
import * as Enums from '../core/Enums'
import { Grid } from '../core/Grid'
import { IGrid } from '../core/IGrid'
import { IGridCell } from '../core/IGridCell'
import { ITetromino } from '../core/ITetromino'
import { Tetromino } from '../core/Tetromino'

interface IMyProps { RenderLoopCounter: number};
interface IMyState { RenderLoopCounter: number, shapes: ITetromino[], theShape: ITetromino };
interface IRandomPiece { ResultPiecesBag: ITetromino[], RandomPiece: ITetromino};

class PlayGrid extends React.Component<IMyProps, IMyState> {

    protected static getDerivedStateFromProps(props : any, state : IMyState) {
        if(state.theShape.ypos <= 6) { // Need to figure out collision detection!
            state.theShape.ypos++;
        }
        else {
            // debugger;
            const newPiece = PlayGrid.getRandomShapeFromBag(state.shapes.length === 0 ? PlayGrid.buildPiecesBag(4) : state.shapes);
            state = {
                RenderLoopCounter: state.RenderLoopCounter, 
                shapes: newPiece.ResultPiecesBag,
                theShape: newPiece.RandomPiece
            };
        }
        return state;
    }

    private static getRandomShapeFromBag(shapes: ITetromino[]) : IRandomPiece {
        const randomIndex = Math.floor(Math.random() * shapes.length);
        const result = shapes[randomIndex];
        shapes.splice(randomIndex, 1);
        return {
            RandomPiece: result, 
            ResultPiecesBag: shapes
        }
    }

    //  Cant just randomise from a set array, to avoid too many repitions make a bag of pieces then pull them out randomly, so you get a good spread of pieces
    private static buildPiecesBag(repitions: number) : ITetromino[] { 
        const i = new Tetromino("I", Enums.Colours.Cyan, 0x4444, 0x00F0, 0x2222, 0x0F00);
        const j = new Tetromino("J", Enums.Colours.Blue, 0x44C0, 0x8E00, 0x6440, 0x0E20);
        const l = new Tetromino("L", Enums.Colours.Orange, 0x4460, 0x0E80, 0xC440, 0x2E00);
        const o = new Tetromino("O", Enums.Colours.Yellow, 0xCC00, 0xCC00, 0xCC00, 0xCC00);
        const s = new Tetromino("S", Enums.Colours.Green, 0x4620, 0x6C00, 0x8C40, 0x06C0);
        const t = new Tetromino("T", Enums.Colours.Purple, 0x4640, 0x0E40, 0x4C40, 0x4E00);
        const z = new Tetromino("Z", Enums.Colours.Red, 0x2640, 0x0C60, 0x4C80, 0xC600);
        const pieces: ITetromino[] = new Array(); 
        Array.from(new Array(repitions)).forEach((x, itteration) => {
            pieces.push(i);
            pieces.push(j);
            pieces.push(l);
            pieces.push(o);
            pieces.push(s);
            pieces.push(t);
            pieces.push(z);
        });
        return pieces;
    }

    private grid: IGrid = new Grid(10, 10);


    constructor(props: any) {
        super(props);

        const pieces = PlayGrid.buildPiecesBag(4);
        const result = PlayGrid.getRandomShapeFromBag(pieces);
        this.state = { RenderLoopCounter: props.RenderLoopCounter, shapes: result.ResultPiecesBag, theShape: result.RandomPiece };
         
        // state.shapes = ;
        // this.state.theShape = this.getRandomShapeFromBag();
        window.onkeydown = (ev: KeyboardEvent): any => this.keyPress(ev);
        // const currentBlock  = shapes[Math.floor(Math.random() * shapes.length - 1) + 0];
        this.grid.height = 10;
    }


    // public getSnapshotBeforeUpdate() {

    // }

    // public componentDidMount() {
    //     // if(this.state.theShape == null) {
    //     //     this.setState({
    //     //         shapes: this.state.shapes,
    //     //         theShape: 
    //     //     });
    //     // }
    // }

    public keyPress(ev: KeyboardEvent) {
        if(ev.code.startsWith("Arrow"))
        {
            const keyStroke : Enums.Keys = Enums.Keys[ev.code];
            switch(keyStroke)
            {
                case Enums.Keys.ArrowUp:
                    this.state.theShape.rotate(Enums.Rotation.CounterClockWise);
                break;
                case Enums.Keys.ArrowDown:
                    this.state.theShape.move(Enums.Direction.Down);
                break;
                case Enums.Keys.ArrowLeft:
                    this.state.theShape.move(Enums.Direction.Left);
                break;
                case Enums.Keys.ArrowRight:
                    this.state.theShape.move(Enums.Direction.Right);
                break;
            }
        }
    }

    public render() {
        return (
            <div>
                {this.renderColumnsAndRows(this.grid.cells, this.state.theShape)}
            </div>
        );
    }

    private renderColumnsAndRows(cells: IGridCell[][], block: ITetromino) {
        return cells.map((row, rowCounter) => {

            return (
                <div key={row[rowCounter].y} className="Row-wrapper">
                    {
                        row.map((column, columnCounter) => {
                            return (<div key={column.x} className="Row-cell" style={{ backgroundColor: this.RenderTetrimino(column.x, column.y, block) }}>{column.x}, {column.y}</div>);
                        })
                    }
                </div>);
        });
    }

    private RenderTetrimino(x: number, y: number, block: ITetromino) {
        // Assume North for now
        // const temp = block.layout >>> 0;
        x = x - block.xpos;
        y = y - block.ypos;
        const binaryNotation = (block.layout >>> 0).toString(2); // This will give a binary notation dump of the current block, this can be substringed per cell 0x4444 = 100010001000100
        const paddedBinaryNotation = this.padStr(binaryNotation, 16, '0'); // = 0100010001000100
        
        // for(let x2:number = 0; x2 < 4; x2++) {
        // for(let y2:number = 0; y2 < 4; y2++) {
        // const binaryRow = paddedBinaryNotation.substr(y2 * 4, 4);
        // if(binaryRow.substr(x2, 1) === "1") { return block.colour; }
        // }
        // }
        const binaryRow = paddedBinaryNotation.substr(y * 4, 4);
        if (binaryRow.substr(x, 1) === "1") { return block.colour; }
        return Enums.Colours.Transparent;
        // 0100010001000100 
        // 0,4
        // 4,4
        // 8,4
        // 12,4
        // console.log();
    }

    private padStr(strToPad: string, width: number, paddingString: string) {
        paddingString = paddingString || '0';
        strToPad = strToPad + '';
        return strToPad.length >= width ? strToPad : new Array(width - strToPad.length + 1).join(paddingString) + strToPad;
    }
}

export default PlayGrid;