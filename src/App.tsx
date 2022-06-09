import { useCallback, useEffect, useState } from 'react';
import useHttp from './hooks/use-http';
import { Film, FilmResponse } from './models/film';

function App() {
  const [films, setFilms] = useState<Film[]>([]);
  const { isLoading, errorMessage, sendRequest } = useHttp();

  const applyFilms = useCallback((responseData: FilmResponse) => {
    const data = responseData.results.map(film => film);

    setFilms(data);
  }, []);

  useEffect(() => {
    sendRequest({ url: 'https://swapi.dev/api/films/' }, applyFilms);
  }, [sendRequest, applyFilms]);

  return <>
    {isLoading && <p>Loading...</p>}
    {!isLoading && errorMessage && <p>{errorMessage}</p>}
    {!isLoading && !errorMessage && films &&
      <>
        <p>Start Wars films:</p>
        <ul>
          {films.map(film => <li key={film.episode_id}>{film.title}</li>)}
        </ul>
      </>
    }
  </>
}

export default App;
