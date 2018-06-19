import * as React from 'react';
import PlayGrid from './components/PlayGrid';

// type MyProps = { here: string };
interface IMyState { RenderLoopCounter: number };

class GameLoop extends React.Component<{}, IMyState> {
    public timerID: NodeJS.Timer;
  
    constructor(props: any) {
        super(props);
        this.state = {RenderLoopCounter: new Date().getSeconds()};
        
    }
  
    public componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        100
      );
    }
  
    public componentWillUnmount() {
      clearInterval(this.timerID);
    }
  
    public render() {
      
      return (
          <div>
              <h1>Timer:</h1>
              <h2>{this.state.RenderLoopCounter}</h2>
              <PlayGrid RenderLoopCounter={this.state.RenderLoopCounter} />
          </div>
      );
    }

    private tick() {
        this.setState({
          RenderLoopCounter: new Date().getSeconds()
        });
      }
  }

export default GameLoop;