import React, { Fragment } from 'react';
import Button from './Layout/Button';
import { useDispatch } from 'react-redux';

import classes from './Movie.module.css';
import { uiActions } from '../store/ui-slice';

const Movie = (props) => {
   const dispatch = useDispatch();

    const onEditHandler = () => {
        dispatch(uiActions.isEditingHandler(props.id));
    };


    // const movieFront = 'no';

    const movieBack = <li
        className={classes.movie}>
        <h2>{props.title}</h2>
        <h3 className={classes.date} >{props.releaseDate}</h3>
        <div>Release Date: {props.ReleaseDate}<br />
            Score: {props.score}
            <h3>Description:</h3>
            <p className={classes.scroll}>
                {props.overview}
            </p>
            <Button onClick={onEditHandler} >Edit</Button>
        </div>

    </li>

    return (
        <Fragment>
            {movieBack}
        </Fragment>

    );
};

export default Movie;