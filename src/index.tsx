import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/Montserrat/Montserrat-VariableFont_wght.ttf';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import HeaderWithSearch from './components/header/header-with-search/HeaderWithSearch';
import MovieDetails from './components/header/movie-details/MovieDetails';
import MovieDialog from './components/dialogs/movie-dialog/MovieDialog';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HeaderWithSearch />,
        children: [{
          path: '/new',
          element: <MovieDialog />,
        }],
      },
      {
        path: '/:movieId',
        element: <MovieDetails />,
      },
      {
        path: '/:movieId/edit',
        element: <MovieDialog />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
