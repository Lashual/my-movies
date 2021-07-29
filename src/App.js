import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Layout/Header';
import MoviesList from './components/moviesList';
import { movieSearch } from './store/ui-actions';
import EditPopup from './components/Layout/EditPopup';
import Footer from './components/Layout/Footer';


const letterPick = () => {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const letter = possible.charAt(Math.floor(Math.random() * possible.length));
  console.log(letter);
  return letter;
}


function App() {
  const isEditing = useSelector(state => state.ui.isEditing);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(movieSearch(letterPick()));

  }, [dispatch]);



  return (
    <div className="App">
      <Header />
      <h1 className='head2'>Movies</h1>
      <div className='movies-list'>
        <MoviesList />
      </div>
      {isEditing && <EditPopup />}
      <Footer />
    </div>
  );
}

export default App;
