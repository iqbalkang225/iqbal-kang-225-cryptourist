import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import CoinsProvider from './context/coins-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <CoinsProvider>
            <App />
        </CoinsProvider>
    </BrowserRouter>
);

