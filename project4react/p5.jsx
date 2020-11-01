import React from 'react';
import { BrowserRouter as Router,  Switch,Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';
import Example from './components/example/Example';
import States from './components/states/States';
import Header from './components/header/Header';

export default function App() {
    return (
      <Router>
        <Header/>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/states">States</Link>
              </li>
              <li>
                <Link to="/example">Example</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/states">
              <States />
            </Route>
            <Route path="/example">
              <Example />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
ReactDOM.render(
  <App/>,
  document.getElementById('reactapp'),
);
