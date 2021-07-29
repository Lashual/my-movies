 //import { useSelector, useDispatch } from 'react-redux';
//   import { reducers } from '../../store/ui-slice';
  import { uiActions } from './ui-slice';

// 'http://www.omdbapi.com/?t='
export const movieSearch = (titleSearch) => {
  //const items = useSelector(state => state.ui.movies);
  //const dispatch = useDispatch();

    return async (dispatch) => {
        await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9796758532d70e1834d1d36493ff287b&query=${titleSearch}`).then
            (response => response.json()).then
            (
                data => {
                    console.log('data=');
                    console.log(data.results);
                    dispatch(uiActions.initiateMovie(data.results));
                });

    };



};


