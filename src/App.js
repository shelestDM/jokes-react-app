import { Fragment, useState } from "react";
import JokesList from "./components/JokesList";
import Loader from "./components/Loader";
import NoJokes from "./components/NoJokes";
import ErrorComponent from "./components/ErrorComponent";
import AddJokes from "./components/AddJokes";
import CustomButton from "./components/CustomButton";
import useHttp from "./hooks/useHttp";
import urlObject from "./urls/url";

function App() {

  const [jokes, setJokes] = useState([]);
  const httpRequestData = useHttp();
  const { isLoading, error, fetchJokesHandler: fetchJokes } = httpRequestData;

  const сonvertRecivedDataFromFirebase = (jokesData) => {
    let loadedJokes = [];

    for (const key in jokesData) {
      loadedJokes.push({
        id: key,
        type: jokesData[key].type,
        setup: jokesData[key].setup,
        punchline: jokesData[key].punchline,
      })
    }
    setJokes([...loadedJokes].reverse());

  }

  const сonvertRecivedDataFromJokes = (jokesData) => {
    setJokes([...jokesData]);
  }

  const fetchByClick = () => {
    fetchJokes({ url: urlObject.jokesUrl }, сonvertRecivedDataFromJokes);
  }

  const fetchByClickFromFirebase = () => {
    fetchJokes({ url: urlObject.fireBaseUrl }, сonvertRecivedDataFromFirebase);
  }

  const onAddJokeHandler = (joke) => {

    const requestOptions = {
      url: urlObject.fireBaseUrl,
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: joke
    }

    fetchJokes(requestOptions, convertRecivedDataAfterCreatingJoke);

  };

  const convertRecivedDataAfterCreatingJoke = async (jokesData) => {
    fetchByClickFromFirebase();
  }


  return (
    <Fragment>
      <AddJokes onAddJoke={onAddJokeHandler} />
      <CustomButton type={'button'} text={'Fetch jokes'} fetch={fetchByClick} />
      <CustomButton type={'button'} text={'Fetch jokes from Firebase'} fetch={fetchByClickFromFirebase} />
      {!isLoading && jokes.length > 0 && <JokesList jokes={jokes} />}
      {!isLoading && !jokes.length && !error.length && <NoJokes />}
      {isLoading && <Loader />}
      {!isLoading && error.length > 0 && <ErrorComponent error={error} />}
    </Fragment>
  );
}

export default App;
