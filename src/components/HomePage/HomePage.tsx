import '../../styles/HomePage.css';
import List from '../List/List';
import SearchBar from '../SearchBar/SearchBar';
import { useList } from '../../hooks/useList';

import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const { listType = "" } = useParams();

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
      <span className="navbar">
        <Link
          className="tab"
          to={'/tvshows'}
          onClick={() => handleLinkClick('tvshows')}
        >
          TV SHOWS
        </Link>
        <Link
          className="tab"
          to={'/movies'}
          onClick={() => handleLinkClick('movies')}
        >
          MOVIES
        </Link>
      </span>
      <SearchBar />
      <List />
    </div>
  );
};

export default HomePage;
