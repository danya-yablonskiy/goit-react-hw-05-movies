import getFilmByName from 'components/API/getFilmByName';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
  const [films, setFilms] = useState([]);
  const [queryName, setQueryName] = useState('');

  const handleChange = e => {
    setQueryName(e.currentTarget.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (queryName === '') {
      return alert('Enter movie title!')
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
              <Link to={`${film.id}`}>{film.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
