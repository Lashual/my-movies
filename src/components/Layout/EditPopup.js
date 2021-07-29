import classes from './EditPopup.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from './Button';
import { uiActions } from '../../store/ui-slice';
import validator from 'validator';


const EditPopup = props => {
    const movieEdit = useSelector(state => state.ui.movies);
    const currentMovie = useSelector(state => state.ui.currentMovieId);
    const dispatch = useDispatch();
    //  const titleRef =useRef('');
    //  const dateRef =useRef('');
    //  const overviewRef =useRef('');

    const currentMovieToEdit = movieEdit.filter(mov => mov.id === currentMovie);
    const [currentMovieEdit, setCurrentMovieEdit] = useState(currentMovieToEdit[0]);

    function onTitleChangeHandler(event) {
        console.log('event.target.id');
        console.log(event.currentTarget);
        setCurrentMovieEdit(prevState => ({...prevState, title: event.target.value }));
        console.log(currentMovieEdit.title);
    };
    const onDateChangeHandler = (event) => {
        setCurrentMovieEdit(prevState => ({...prevState, year: event.target.value }));
    };
    const onOverviewChangeHandler = (event) => {
        setCurrentMovieEdit(prevState => ({...prevState, overview: event.target.value }));
    };

    const editCancelHandler = () => {
        dispatch(uiActions.isNotEditing());
    };

    const validTitle = currentMovieEdit.title.trim().length > 0;
    const validOverview = currentMovieEdit.overview.trim().length > 0;
    const validDate = (validator.isDate(currentMovieEdit.year));

    const titleFixer = title => {
        title = title.replace(/[^a-zA-Z0-9-. ]/g, "");
        title = title.replace(/\s+/g, ' ').trim();
        title.split('');
        let setTitle=[]
        for (let i = 0; i < title.length; i++) {
            console.log(`i = ${i}  and title[i]= ${title[i]}`);
            if (i === 0 || (title[i - 1]) === ' ') {
                setTitle[i] = title[i].charAt(0).toUpperCase();
            } else
            setTitle[i] = title[i].charAt(0).toLowerCase();
        }
        title = setTitle.join('');

        return title;
    };


    const editConfirmHandler = (event) => {
        event.preventDefault();
        if (validTitle && validOverview && validDate) {
            dispatch(uiActions.isNotEditing());
            const tit = titleFixer(currentMovieEdit.title);
            setCurrentMovieEdit(prevState => ({...prevState, title: tit }));
            // console.log(tit);
            // console.log('^ - tit, v - title');
            // console.log(currentMovieEdit.title);
             dispatch(uiActions.updateMovieHandler(currentMovieEdit));
        }
    };


    return (
        <form className={classes.backdrop}
            onSubmit={editConfirmHandler.bind(currentMovieEdit)}>
            <div className={classes.modal}>
                <h1>Edit Movie</h1>
                <label htmlFor='title' >Title:</label>
                <input
                    type='text'
                    value={currentMovieEdit.title}

                    //ref={titleRef}
                    onChange={onTitleChangeHandler}
                />
                {validTitle ? '' : <p className={classes.missing}>Please enter a Title!</p>}
                <label htmlFor='Release Date' >Release Date:</label>
                <input
                    type='date'
                    value={currentMovieEdit.year}
                    // ref={dateRef}
                    onChange={onDateChangeHandler} />
                {validDate ? '' : <p className={classes.missing}>Please enter a valid date!</p>}
                <label htmlFor='overview' >Description:</label>
                <textarea
                    rows='6'
                    type='text'
                    value={currentMovieEdit.overview}
                    //ref={overviewRef}
                    onChange={onOverviewChangeHandler} />
                {!validOverview && <p className={classes.missing}>Please enter some text!</p>}

                <div>
                    <Button onClick={editCancelHandler}>Cancel</Button>
                    <Button className={classes.edit}>Edit</Button>
                </div>
            </div>


        </form>
    );
};

export default EditPopup;