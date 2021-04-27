import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

const hot = (module as any).hot;

if (hot) {
  hot.accept();
}

ReactDOM.render(<App />, document.getElementById('container'));
