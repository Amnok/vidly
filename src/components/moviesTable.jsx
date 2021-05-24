import React, { Component } from 'react';
import Like from '../common/Like';
import TableHeader from '../common/tableHeader';

export default class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRental', label: 'Rate' },
    { key: 'like' },
    { key: 'delete' },
  ];
  render() {
    const { movies, onLike, onDelete, sortColumn, onSort } = this.props;
    return (
      <div>
        <table className="table">
          <TableHeader
            columns={this.columns}
            sortColumn={sortColumn}
            onSort={onSort}
          />
          {/* <thead>
            <tr>
              <th onClick={() => this.raiseSort('title')}>Title</th>
              <th onClick={() => this.raiseSort('genre.name')}>Genre</th>
              <th onClick={() => this.raiseSort('numberInStock')}>Stock</th>
              <th onClick={() => this.raiseSort('dailyRentalRate')}>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead> */}
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <th>{movie.title}</th>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Like
                    liked={movie.isLiked}
                    handleLike={() => onLike(movie)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
