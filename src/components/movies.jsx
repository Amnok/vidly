import React, { Component } from 'react';
import _ from 'lodash';
import { getMovies } from '../services/fakeMovieService';
import Pagination from '../common/pagination';
import paginate from '../utils/paginate';
import ListGroup from '../common/listGroup';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import SearchBox from '../common/searchBox';

export default class Movies extends Component {
  state = {
    movies: getMovies(),
    genres: [{ _id: '', name: 'All genres' }, ...getGenres()],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: '',
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleGenreSelect = (genre) => {
    console.log(genre);
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleLike = (movie) => {
    console.log('liked');
    const tMovies = [...this.state.movies];
    const index = this.state.movies.findIndex((m) => m._id === movie._id);
    tMovies[index].isLiked = !movie.isLiked;
    this.setState({ movies: tMovies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  getPageData = () => {
    const {
      movies: allMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no movies in DB.</p>;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            onItemSelect={this.handleGenreSelect}
            textProperty="name"
            valueProperty="_id"
            selectedItem={selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            onPageChange={this.handlePageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
