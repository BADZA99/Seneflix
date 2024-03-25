
import './App.css';
// import Home from './components/Home';
import Main from './components/Main';
import {Route,Routes } from 'react-router-dom';
import Signin from './components/Signin';



function App() {
  return (
    <div>
<Routes>
<Route path='/' element={<Main />}/>
<Route path='/signin' element={<Signin />}/>

</Routes>
    </div>
  );
}

export default App;
