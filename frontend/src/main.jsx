import React from 'react';
import { createRoot } from 'react-dom/client'; // Updated import
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ConfigureStore } from './redux/configureStore';
import MainRouter from './MainRouter';
import './index.css';

const store = ConfigureStore();
const container = document.getElementById('root'); // Get the root element
const root = createRoot(container); // Create a root

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  </Provider>
);
