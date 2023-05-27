import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import getOneFilm from 'components/API/getOneFilm';
import { useEffect, useState } from 'react';

const FilmDetails = () => {
  const [details, setDetails] = useState([]);
  const { filmId } = useParams();
  useEffect(() => {
    getOneFilm(filmId)
      .then(response => setDetails(response))
      .catch(err => console.error(err));
  }, [filmId]);
  return (
    <div>
      <Link to={'/movies'}>Back</Link>
      <div>
        <img
          src={
            details.poster_path &&
            `https://image.tmdb.org/t/p/w500${details.poster_path}`
          }
          alt={`Poster for ${details.title}`}
          width="300"
          height="400"
        />
        <h1>{details.title}</h1>
        <p>User score: {(details.vote_average * 10).toFixed(0)}%</p>
        <h2>Overview</h2>
        <p> {details.overview}</p>
        <h3>Genres</h3>
        <ul>
          {details.genres &&
            details.genres.map(genre => <li key={genre.id}>{genre.name}</li>)}
        </ul>
      </div>
      <div>
        <p>Additional infotmation</p>
        <Link to={'cast'}>Cast</Link>
        <br />
        <Link to={'rewievs'}>Rewievs</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default FilmDetails;
