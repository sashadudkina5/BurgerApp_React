import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux_services/store';
import { HashRouter } from "react-router-dom";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

declare global {
  interface Window {
    Cypress?: any;
    store?: typeof store;
  }
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <HashRouter>
        <App />
    </HashRouter>
    </Provider>
  </React.StrictMode>
);

declare global {
  interface Window { store?: typeof store }
}

if (window.Cypress) {
  window.store = store;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
