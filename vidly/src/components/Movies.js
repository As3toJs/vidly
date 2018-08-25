import React, { Component } from 'react';
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from './Like';
import Pagination from './Pagination';
import { paginate } from '../utils/paginate';

export default class Movies extends Component {
    state = {
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

    renderMovieTable = () => {
        const { movies, currentPage, pageLimit } = this.state;
        const { length: movieCount } = this.state.movies;
        const moviesPerPage = paginate(movies, currentPage, pageLimit);
        return (
            <div>
                <span>
                    Showing {movieCount} movies in the database.
                </span>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {moviesPerPage.map(movie => {
                            return this.renderRow(movie)
                        }
                        )}
                    </tbody>
                </table>
                <Pagination
                    pageLimit={pageLimit}
                    currentPage={currentPage}
                    total={movies.length}
                    onSelectePage={this.onSelectPageHandler}
                />
            </div>
        )
    }

    onSelectPageHandler = (page) => {
        this.setState({ currentPage: page })
    }

    renderRow = (items) => {
        return (
            <tr key={items._id}>
                <td>{items.title}</td>
                <td>{items.genre.name}</td>
                <td>{items.numberInStock}</td>
                <td>{items.dailyRentalRate}</td>
                <td>{
                    <Like
                        items={items}
                        onLikeClicked={this.likeClicked}
                    />}
                </td>
                <td>{this.renderButton(items._id)}</td>
            </tr>
        )
    }

    likeClicked = (movie) => {
        const movies = this.state.movies;
        const index = movies.indexOf(movie);
        movies[index].liked = !movies[index].liked;
        this.setState({ movies });
    }

    renderButton = (id) => {
        return <button onClick={() => this.handleDeleteMovie(id)} className="btn btn-danger">Delete</button>
    }

    handleDeleteMovie = (id) => {
        deleteMovie(id);
        this.setState({ movies: getMovies() })
    }
}
