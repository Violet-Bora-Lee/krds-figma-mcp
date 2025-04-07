import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import ButtonDemo from './pages/ButtonDemo';

const App = () => {
  return <ButtonDemo />;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);