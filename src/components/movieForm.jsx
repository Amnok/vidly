import React from 'react';
import Form from '../common/form';
import Joi from 'joi-browser';
import _ from 'lodash';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import withSkeleton from '../hocs/withSkeleton';
import Input from '../common/input';

export default class MovieForm extends Form {
  state = {
    data: {
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: '',
    },
    genres: [],
    errors: {},
    isLoading: false,
  };
  styles = {
    skeleton: {
      marginBottom: 20,
      height: 38,
      width: 690,
    },
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('GenreId'),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental rate'),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      this.setState({ isLoading: true });
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;
      const { data: movie } = await getMovie(movieId);
      setTimeout(() => {
        this.setState({ data: this.mapToViewModel(movie), isLoading: false });
      }, 5000);
    } catch (ex) {
      if (ex.response) return this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }
  doSubmit = async () => {
    await saveMovie(this.state.data);
    this.props.history.push('/movies');
  };
  render() {
    const { isLoading } = this.state;
    const Tests = withSkeleton(this.renderInput(), isLoading, {
      style: this.styles.skeleton,
    });
    const renderFormData = () => {
      return (
        <React.Fragment>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'rate')}
          {this.renderButton('Save')}
        </React.Fragment>
      );
    };
    return (
      <React.Fragment>
        <h1>New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {isLoading
            ? _.times(4).map((elem) => <Tests key={elem} />)
            : renderFormData()}
        </form>
      </React.Fragment>
    );
  }
}
