import React, { Component } from 'react';
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import Like from './Like';

export default class Movies extends Component {
    state = {
        movies: getMovies(),
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
        return (
            <div>
                <span>
                    Showing {this.state.movies.length} movies in the database.
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
                        {this.state.movies.map(movie => {
                            return this.renderRow(movie)
                        }
                        )}
                    </tbody>
                </table>
            </div>
        )
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
