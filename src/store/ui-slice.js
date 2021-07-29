import { createSlice } from "@reduxjs/toolkit";
// import {movieSearch} from './ui-actions';

const initialState = {
    search: '',
    editedMovies: [],
    currentMovieId: '',
    movies: [],
    isEditing: false,
    isLoading: false ,
}

const uiSlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        searchMovie(state, action) {
            state.search = action.payload;
        },

        isEditingHandler(state, action) {
            state.isLoading =true;
            state.currentMovieId = action.payload;
            state.isEditing = true;
            const movieEdit = state.movies.filter(movie => movie.id === action.payload);
            state.editedMovies = [...movieEdit];
            state.isLoading =false;
        },

        updateMovieHandler(state, action) {
            state.isLoading =true;
            console.log('action:');
            console.log(action);
            const ifId = state.editedMovies.filter(movie => movie.id === action.payload.id);
            if (ifId) {
            state.editedMovies[action.payload.id] = action.payload;
            } else {
                state.editedMovies = {...action.payload};
            }
            // const d = state.editedMovies;
            state.movies = {...state.editedMovies};
            console.log('state.editedMovies');
            console.log(state.movies);
            state.isLoading =false;
        },

        isNotEditing(state) {
            state.isEditing = false;
        },

        initiateMovie(state, action) {
            let movieArray = [];
            state.movies = [...state.editedMovies];

            action.payload.map(movie => {
                return (
                    movieArray.push({
                        id: movie.id,
                        title: movie.title,
                        year: movie.release_date,
                        score: movie.vote_average,
                        overview: movie.overview,
                        poster: movie.poster_path,
                    }))
            });
            console.log('movieArray=');
            console.log(movieArray);
            state.movies = [...movieArray];
            // const setMovies = new Set(state.movies);
            // console.log('setmovies');
            // console.log(setMovies);
            let availableMov = movieArray.filter(mov => state.movies.id !== mov.id);
            console.log('availableMov');
            console.log(availableMov);
            state.movies = [...availableMov];




            //        console.log('setMovies:');
            // console.log(setMovies);
            //    state.movies = [...setMovies];


        },
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice;