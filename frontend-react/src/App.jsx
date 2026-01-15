import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RetrievePage from './pages/RetrievePage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';

function App() {

  // getting the year:
  const currYear = new Date().getFullYear();

  return (
    <div className="app">
      <header>
        <h1>Exercise Tracker</h1>
        <p>Keep track of your progress!</p>
      </header>
        <Router>
          <nav>
            <Link to="/">Home</Link> 
            <Link to="/create">Add exercise here!</Link>
          </nav>
          <main>
          <Routes>
            <Route path="/" element={<RetrievePage/>}></Route>
            <Route path="/create" element={ <CreatePage />}></Route>
            <Route path="/update" element={ <UpdatePage />}></Route>
          </Routes>
          </main>
        </Router>
        <footer>
          <p>&copy; {currYear} Elena Vizgirdaite</p>
        </footer>
    </div>
  );
}

export default App;