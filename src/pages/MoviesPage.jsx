import getFilmByName from 'components/API/getFilmByName';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [films, setFilms] = useState([]);
  const [queryName, setQueryName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const location = useLocation();

  const handleChange = e => {
    setQueryName(e.currentTarget.value.trim());
  };
  useEffect(() => {
    queryName !== '' && setQueryName(query);
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
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
        <input type="text" onChange={handleChange} value={queryName} />
        <button type="submit">Search</button>
      </form>
      <ul>
        {films &&
          films.map(film => (
            <li key={film.id}>
              <Link to={`${film.id}`} state={location}>
                {film.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
