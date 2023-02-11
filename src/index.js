import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';
import GraphPage from './features/graphPage/GraphPage';
import FlavorPage from './features/flavorPage/FlavorPage';
import FlavorDetailPage from './features/flavorDetailPage/FlavorDetailPage';
import ErrorPage from './features/errorPage/ErrorPage';

import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);
const mdTheme = createTheme();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'graph',
        element: <GraphPage />,
      },
      {
        path: 'flavor',
        element: <FlavorPage />,
      },
      {
        path: 'flavor/:id',
        element: <FlavorDetailPage />,
      },
    ],
  },
]);

root.render(
  // NOTE: disable strict mode because it causes rendering issues
  //       with react-force-graph
  <Provider store={store}>
    <ThemeProvider theme={mdTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
