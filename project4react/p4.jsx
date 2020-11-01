import React from 'react';
import ReactDOM from 'react-dom';
import Example from './components/example/Example';
import States from './components/states/States';
import Header from './components/header/Header';

class Switcher extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          com:"Example"
        };
    }
    handleButtonClick(event) {
        if(this.state.com=="Example"){
            this.setState({ com: "States" });
        }
        else this.setState({ com: "Example" });
    }
    render() {
        if(this.state.com=="Example"){
            return (
                <div>
                  <button type="button" onClick={e => this.handleButtonClick(e)}>
                    Switch to {this.state.com}
                  </button>
                  <States/>
                </div>
              );
        }
        else{
            return (
                <div>
                  <button type="button" onClick={e => this.handleButtonClick(e)}>
                    Switch to {this.state.com}
                  </button>
                  <Example/>
                </div>
              );
        }
     
    }
}

function App() {
  return (
    <div>
      <Header/>
      <Switcher/>
    </div>
  );
}
ReactDOM.render(
  <App/>,
  document.getElementById('reactapp'),
);
