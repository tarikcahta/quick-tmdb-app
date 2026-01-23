import '../../styles/HomePage.css';
import List from '../List/List';
import SearchBar from '../SearchBar/SearchBar';
import { useList } from '../../hooks/useList';
import { useAuth } from '../../hooks/useAuth';

import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

const HomePage = () => {
  const { listType = '' } = useParams();

  const { context } = useList();
  const { fetchList } = context;
  const { user, profile, signOut } = useAuth();

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
          <div className="auth-area">
            {user ? (
              <div className="user-badge">
                <span>
                  {profile?.username || user.email}
                  {!profile?.username && (
                    <Link to="/sign-in" className="profile-link">
                      Complete profile
                    </Link>
                  )}
                </span>
                <button className="sign-out-btn" onClick={signOut}>
                  Sign out
                </button>
              </div>
            ) : (
              <Link to="/sign-in" className="sign-in-btn">
                Sign in
              </Link>
            )}
          </div>
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
