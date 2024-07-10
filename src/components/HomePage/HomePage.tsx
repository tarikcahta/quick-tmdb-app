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
          <span className="sign-in-btn">
            <a href="#">Sign in</a>
          </span>
          <span className="tabs">
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
          </span>
        </div>
        <SearchBar />
      </div>
      <div className="list-container">
        <List />
      </div>
    </div>
  );
};

export default HomePage;
