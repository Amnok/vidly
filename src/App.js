import Movies from './components/movies';
import {Redirect, Route, Switch} from 'react-router-dom';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import './App.css';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div>
      <ToastContainer/>
      <NavBar/>
      <main className="container">
      <Switch>
      <Route path='/register' component={RegisterForm}></Route>
      <Route path='/login' component={LoginForm}></Route>
       <Route path='/movies/:id' component={MovieForm}></Route>
        <Route path='/movies' component={Movies}></Route>
        <Route path='/customers' component={Customers}></Route>
        <Route path='/rentals' component={Rentals}></Route>
        <Route path='/not-found' component={NotFound}></Route>
        <Redirect from ='/' exact to ='/movies' />
        <Redirect to='not-found'/>
      </Switch>
      </main>
    </div>
  );
}

export default App;
