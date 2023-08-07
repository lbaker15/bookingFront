import React, { useReducer } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';

import { Provider } from 'react-redux';
import App from './App';

const domNode = document.getElementById('root');
if (domNode) {
  const root = ReactDOM.createRoot(domNode);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
