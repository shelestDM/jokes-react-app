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
  const [error, setError] = useState(null);

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

  useEffect(()=>{
    fetchJokesHandler();
  },[fetchJokesHandler]);


  const onAddJokeHandler = (joke) => {
    console.log(joke);
  }

  return (
    <Fragment>
      <AddJokes onAddJoke={onAddJokeHandler}/>
      <CustomButton type={'button'} text={'Fetch jokes'} fetchJokes={fetchJokesHandler} />
      {!isLoading && jokes.length>0 && <JokesList jokes={jokes} />}
      {!isLoading && !error && <NoJokes/>}
      {isLoading && <Loader />} 
      {!isLoading && !error && <ErrorComponent error={error}/>}
    </Fragment>
  );
}

export default App;
