import getFilmByName from 'components/API/getFilmByName';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  const query = searchParams.get('query') ?? '';
  console.log(query);
  const [queryName, setQueryName] = useState(query);

  const [films, setFilms] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (query !== '') {
      getFilmByName(queryName)
        .then(response => {
          setFilms(response.results);
        })
        .catch(err => console.error(err));
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    setQueryName(e.currentTarget.elements.input.value);
    setSearchParams({ query: queryName });
    if (queryName === '') {
      return alert('Enter movie title!');
    }
    getFilmByName(queryName)
      .then(response => {
        setFilms(response.results);
      })
      .catch(err => console.error(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="input" type="text" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {films &&
          films.map(film => (
            <li key={film.id}>
              <Link to={`${film.id}`} state={{ from: location }}>
                {film.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
