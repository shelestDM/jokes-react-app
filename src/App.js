import { Fragment, useEffect, useState ,useCallback } from "react";
import JokesList from "./components/JokesList";
import Loader from "./components/Loader";
import NoJokes from "./components/NoJokes";
import ErrorComponent from "./components/ErrorComponent";
import AddJokes from "./components/AddJokes";
import CustomButton from "./components/CustomButton";

function App() {

  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJokesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_ten');
      if (!response.ok){
        throw new Error('Something went wrong :(');
      }
      const jokesData = await response.json();
      setJokes(previousJokes => [...jokesData]);
      setError(true);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  },[]);

  const fetchFireBaseJokesHandler = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://jokes-react-app-default-rtdb.firebaseio.com/jokes.json');
      if (!response.ok){
        throw new Error('Something went wrong :(');
      }
      const jokesData = await response.json();
      
      let loadedJokes = [];

      for (const key in jokesData) {
        loadedJokes.push({
          id: key,
          type: jokesData[key].type,
          setup: jokesData[key].setup,
          punchline: jokesData[key].punchline,
        })
      }
      console.log(loadedJokes);

      setJokes(previousJokes => [...loadedJokes]);
      setError(true);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  },[]);

  // useEffect(()=>{
  //   fetchJokesHandler();
  // },[fetchJokesHandler]);


  async function onAddJokeHandler (joke) {
    const response = await fetch('https://jokes-react-app-default-rtdb.firebaseio.com/jokes.json', {
      method: 'POST',
      body: JSON.stringify(joke),
      headers: {
        'Content-type' : 'application/json'
      }
    });
    const data = await response.json();
    console.log(data);
  }

  return (
    <Fragment>
      <AddJokes onAddJoke={onAddJokeHandler}/>
      <CustomButton type={'button'} text={'Fetch jokes'} fetchJokes={fetchJokesHandler} />
      <CustomButton type={'button'} text={'Fetch jokes from Firebase'} fetchJokes={fetchFireBaseJokesHandler} />
      {!isLoading && jokes.length>0 && <JokesList jokes={jokes} />}
      {!isLoading && !error && <NoJokes/>}
      {isLoading && <Loader />} 
      {!isLoading && error.length>0 && <ErrorComponent error={error}/>}
    </Fragment>
  );
}

export default App;
