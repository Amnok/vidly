import React, { Component, useMemo } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import { deleteMovie, getMovies } from '../services/movieService';
import Pagination from '../common/pagination';
import paginate from '../utils/paginate';
import ListGroup from '../common/listGroup';
import { getGenres } from '../services/genreService';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import SearchBox from '../common/searchBox';
import withSkeleton from '../hocs/withSkeleton';

export default class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: '',
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
    isLoading: false,
  };

  styles = {
    columnSkeleton: {
      display: 'flex',
      flexDirection: 'column',
    },
  };

  async componentDidMount() {
    this.setState({ isLoading: true });
    const { data } = await getGenres();
    const genres = [{ _id: '', name: 'All Genres' }, ...data];

    setTimeout(async () => {
      const { data: movies } = await getMovies();
      this.setState({ genres, movies, isLoading: false });
    }, 2000);
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
    try {
      await deleteMovie(movie._id);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error('Movie already deleted');
        this.setState({ movies: originalMovies });
      }
    }
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

  MovieSkeleton = () => {
    return (
      <div className="row">
        <div className="col-3">
          <Skeleton height={300} width={200}></Skeleton>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Skeleton
            height={50}
            width={120}
            style={{ marginBottom: 10 }}
          ></Skeleton>
          <Skeleton
            height={30}
            width={120}
            style={{ marginBottom: 10 }}
          ></Skeleton>
          <Skeleton
            height={50}
            width={800}
            style={{ marginBottom: 10 }}
          ></Skeleton>
          <Skeleton
            height={270}
            width={800}
            style={{ marginBottom: 10 }}
          ></Skeleton>
          <Skeleton
            height={50}
            width={150}
            style={{ marginBottom: 10 }}
          ></Skeleton>
        </div>
      </div>
    );
  };
  render() {
    const { length: count } = this.state.movies;
    const { selectedGenre, sortColumn, searchQuery, isLoading } = this.state;
    const { user = {} } = this.props;

    // const ListGroupSkeleton = withSkeleton(ListGroup, isLoading, {
    //   style: { height: 200, width: 200 },
    // });

    // const LinkSkeleton = withSkeleton(Link, isLoading, {
    //   style: this.styles.linkSkeletonStyles,
    // });

    // if (count === 0) return <p>There are no movies in DB.</p>;
    if (isLoading) return this.MovieSkeleton();
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
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}
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
