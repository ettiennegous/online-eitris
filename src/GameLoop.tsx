import * as React from 'react';
import PlayGrid from './components/PlayGrid';

// type MyProps = { here: string };
interface IMyState { date: number };

class GameLoop extends React.Component<{}, IMyState> {
    public timerID: NodeJS.Timer;
  
    constructor(props: any) {
        super(props);
        this.state = {date: new Date().getSeconds()};
        
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
              <h2>{this.state.date}</h2>
              <PlayGrid RenderLoop={this.state.date} />
          </div>
      );
    }

    private tick() {
        this.setState({
          date: new Date().getSeconds()
        });
      }
  }

export default GameLoop;