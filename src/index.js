import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { nanoid } from 'nanoid';

const DATA = [
  { id: 'todo' + nanoid(), name: 'Eat', completed: true },
  { id: 'todo' + nanoid(), name: 'Sleep', completed: false },
  { id: 'todo' + nanoid(), name: 'Repeat', completed: false },
];

// const BUTTONS = [
//   { filter: 'all' },
//   { filter: 'active' },
//   { filter: 'completed' },
// ];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
