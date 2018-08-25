import React, { Component } from 'react';
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";

import Pagination from './Pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './ListGroup';
import './Movies.css';
import MoviesTable from './MoviesTable';

export default class Movies extends Component {
    state = {
        genres: [{ _id: 0, name: "All Genres" }, ...genres],
        selectedGenre: "All Genres",
        movies: getMovies(),
        pageLimit: 4,
        currentPage: 1,
    }
    render() {
        return (
            <div style={{ padding: '0.5em' }}>
                {this.state.movies.length > 0 ?
                    this.renderMovieTable() :
                    this.message()
                }
            </div>
        )
    }

    message = () => {
        return '</span>There are no movies in the database</span>';
    }

    handleSelectGenres = (selected) => {
        this.setState({ selectedGenre: selected.name })
    }

    renderMovieTable = () => {
        const { movies, currentPage, pageLimit, genres, selectedGenre } = this.state;
        const filteredMovies = selectedGenre !== 'All Genres' ?
            movies.filter(movie => movie.genre.name === selectedGenre) :
            movies;
        const moviesPerPage = paginate(filteredMovies, currentPage, pageLimit);
        return (
            <div className="vidly">
                <ListGroup
                    genres={genres}
                    selectedGenre={selectedGenre}
                    selectGenres={this.handleSelectGenres} />
                <div className="movieList">
                    <p>Showing {filteredMovies.length} movies in the database.</p>
                    <MoviesTable
                        movies={moviesPerPage}
                        handleDeleteMovie={this.onHandleDeleteMovie}
                    />
                    <Pagination
                        pageLimit={pageLimit}
                        currentPage={currentPage}
                        total={filteredMovies.length}
                        onSelectePage={this.onSelectPageHandler}
                    />
                </div>
            </div>
        )
    }

    onSelectPageHandler = (page) => {
        this.setState({ currentPage: page })
    }

    likeClicked = (movie) => {
        const movies = this.state.movies;
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    onHandleDeleteMovie = (id) => {
        deleteMovie(id);
        this.setState({ movies: getMovies() })
    }
}
