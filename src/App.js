import './App.css';
import Movies from './components/movies';
import {Route} from 'react-router-dom';

function App() {
  return (
    <div>
      {/* <main className="container"> <Movies/></main> */}
      <div>
        <Route path='/' component={Movies}></Route>
      </div>
    </div>
  );
}

export default App;
