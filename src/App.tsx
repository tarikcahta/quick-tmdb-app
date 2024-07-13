import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { ListProvider } from './context/ListContext';
import CardDetailed from './components/CardDetailed/CardDetailed';
import SignInPage from './components/SignInPage/SignInPage';

function App() {
  return (
    <Router>
      <ListProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/tvshows" />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/:listType" element={<HomePage />} />
            <Route path="/details/:id" element={<CardDetailed />} />
          </Routes>
        </div>
      </ListProvider>
    </Router>
  );
}

export default App;
