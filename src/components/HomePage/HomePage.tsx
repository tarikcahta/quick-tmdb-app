import '../../styles/HomePage.css';
import { useContext } from 'react';
import List from '../List/List';
import { ListContext } from '../../context/ListContext';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

const HomePage = () => {
  const { fetchList } = useContext(ListContext);

  const handleLinkClick = (type: string) => {
    fetchList(type);
  };
  return (
    <div className="homepage">
      <span className="navbar">
        <Link to={'/tvshows'} onClick={() => handleLinkClick('tvshows')}>
          TV SHOWS
        </Link>
        <Link to={'/movies'} onClick={() => handleLinkClick('movies')}>
          MOVIES
        </Link>
      </span>
      <SearchBar />
      <List />
    </div>
  );
};

export default HomePage;
