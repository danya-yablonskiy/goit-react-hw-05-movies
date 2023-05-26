import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MoviesPage from '../pages/MoviesPage';
import Layout from './Layout/Layout';
import FilmDetails from './FilmDetails/FilmDetails';
import Cast from '../components/Cast/Cast';
import Rewievs from '../components/Rewievs/Rewievs';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:filmId" element={<FilmDetails />}>
          <Route path="cast" element={<Cast />} />
          <Route path="rewievs" element={<Rewievs />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default App;
