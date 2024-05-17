import '../../styles/HomePage.css';
import List from '../List/List';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import { useList } from '../../hooks/useList';

const HomePage = () => {
  const { context } = useList();
  const { fetchList } = context;

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
