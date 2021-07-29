import React from 'react';
import Movie from './Movie';
import classes from './MoviesList.module.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { timeout } from 'async';

// const Dummy_Movies = [
//     {
//         id: 'm1',
//         Title: "Dog Day Afternoon ",
//         Year: "1975",
//         Runtime: "125 min",
//         Genre: "Drama",
//         Director: "Sidney Lumet"
//     },
//     {
//         id: 'm2',
//         Title: "Titanic",
//         Year: "1964",
//         Runtime: "215 min",
//         Genre: "Drama",
//         Director: "Sidney Lumet"  
//     },
//     {id: 'm3',
//     Title: "The hulk",
//     Year: "2010",
//     Runtime: "115 min",
//     Genre: "Action",
//     Director: "Joe Antman"
// }

// ];



const MoviesList = (props) => {
    const [hover, setHover] = useState('');
    const moviesList = useSelector(state => state.ui.movies);
    const isLoading = useSelector(state => state.ui.isLoading);


    const onMouseEnter = () => {
        timeout(setHover('hover'), 550)
    }
    const onMouseLeave = () => {
        timeout(setHover(''), 550);
    }
    const moviesListClasses = `${classes['movies-list']} ${hover}`

    const ifMovies =  moviesList.map((movie) => (
            <div className={classes['movie-item']}
                key={movie.id}
            >
                <Movie
                    id={movie.id}
                    title={movie.title}
                    score={movie.score}
                    ReleaseDate={movie.year}
                    overview={movie.overview}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}

                />
            </div>
        ));

        const noMovies = <div className={classes.noShow}> No Movies To Show </div>    
        const loading= <p className={classes.loading}>Loading...</p>;



    return (
        <div className={classes.list}>
        <section className={moviesListClasses}>
        {isLoading && loading }
            {moviesList ? ifMovies : noMovies}
        </section>
        </div>
    );
};

export default MoviesList;
