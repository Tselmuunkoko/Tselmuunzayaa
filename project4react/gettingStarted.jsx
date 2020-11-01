import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

import Example from './components/example/Example';
import Header from './components/header/Header';
function App() {
  return (
    <div>
      <Header/>
      <Example />
    </div>
  );
}
ReactDOM.render(
  <App/>,
  document.getElementById('reactapp'),
);
