
import './App.css';
// import Home from './components/Home';
import Main from './components/Main';
import {Route,Routes } from 'react-router-dom';
import Signin from './components/Signin';
import MovieDetails from './components/MovieDetails';



function App() {
  return (
    <div>
<Routes>
<Route path='/' element={<Main />}/>
<Route path='/signin' element={<Signin />}/>
<Route path='/movieDetails' element={<MovieDetails />}/>

</Routes>
    </div>
  );
}

export default App;
