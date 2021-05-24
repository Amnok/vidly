import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import Like from '../common/Like';
import Pagination from '../common/pagination';

export default class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    console.log('liked');
    const tMovies = [...this.state.movies];
    const index = this.state.movies.findIndex((m) => m._id === movie._id);
    tMovies[index].isLiked = !movie.isLiked;
    this.setState({ movies: tMovies });
  };

  handlePageChange = (page) => {};
  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in DB.</p>;
    return (
      <div>
        <p>Showing {count} movies in the database.</p>
        <table class="table">
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
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Like
                    liked={movie.isLiked}
                    handleLike={() => this.handleLike(movie)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
