import '../../styles/HomePage.css';
import List from '../List/List';
import SearchBar from '../SearchBar/SearchBar';
import { useList } from '../../hooks/useList';

import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const { listType = '' } = useParams();

  const { context } = useList();
  const { fetchList } = context;

  const handleLinkClick = (type: string) => {
    fetchList(type);
  };

  useEffect(() => {
    fetchList(listType);
  }, [listType]);

  return (
    <div className="homepage">
      <div className="intro-section">
        <div className="navbar">
          <Link
            className={`tab ${listType === 'tvshows' ? 'tab-active' : ''}`}
            to={'/tvshows'}
            onClick={() => handleLinkClick('tvshows')}
          >
            TV SHOWS
          </Link>
          <Link
            className={`tab ${listType === 'movies' ? 'tab-active' : ''}`}
            to={'/movies'}
            onClick={() => handleLinkClick('movies')}
          >
            MOVIES
          </Link>
        </div>
        <SearchBar />
      </div>
      <List />
    </div>
  );
};

export default HomePage;
