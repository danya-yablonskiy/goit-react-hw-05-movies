import getFilmByName from 'components/API/getFilmByName';
import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ListItem } from './HomePage.styled';
const MoviesPage = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  const [queryName, setQueryName] = useState(query);
  const [films, setFilms] = useState([]);

  const location = useLocation();

  useEffect(() => {
    if (queryName) {
      getFilmByName(queryName)
        .then(response => {
          setFilms(response.results);
        })
        .catch(err => console.error(err));
    }
  }, [queryName]);

const handleSubmit = e => {
    e.preventDefault();
    setQueryName(e.currentTarget.elements.input.value);
    setSearchParams({ query: e.currentTarget.elements.input.value });
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
            <ListItem key={film.id}>
              <Link to={`${film.id}`} state={{ from: location }}>
                {film.title}
              </Link>
            </ListItem>
          ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
