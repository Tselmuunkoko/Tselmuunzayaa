import React from 'react';
import ReactDOM from 'react-dom';

import States from './components/states/States';
import Header from './components/header/Header';
function App() {
  return (
    <div>
      <Header/>
      <States />
    </div>
  );
}
ReactDOM.render(
  <App/>,
  document.getElementById('reactapp'),
);
