import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const App = () => {
  return <h1 className="text-3xl font-bold underline">Hello, world!</h1>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);