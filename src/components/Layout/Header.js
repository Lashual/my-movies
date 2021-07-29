import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';
import { movieSearch } from '../../store/ui-actions';


const Header = props => {
    const dispatch = useDispatch();
    let titleSearch = useSelector(state => state.ui.search);

    const onSearchHandler = event => {
     titleSearch = dispatch(uiActions.searchMovie(event.target.value));
     console.log(titleSearch);
     if (titleSearch.payload )
      dispatch(movieSearch(titleSearch.payload));
    };

    return (
        <header className={classes.header} >
            <h1> Movies for each </h1>
            <div>Live search
                <input className={classes.search}
                    type='text'
                    onChange={onSearchHandler}
                    placeholder='Search your desired movie'
                    value={titleSearch}
                />
            </div>


        </header>
    );

};


export default Header;