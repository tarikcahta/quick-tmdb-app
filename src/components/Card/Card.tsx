import { Link } from 'react-router-dom';

import '../../styles/Card.css';
import { CardProps } from '../../types/types';
import { useList } from '../../hooks/useList';
import { getMovieDetails, getTVSeriesDetails } from '../../requests/requests';

const Card: React.FC<CardProps> = ({ posterPath, title, id }) => {
  const { context } = useList();
  const { setSelectedMediaItem, listType } = context;

  let imageUrl;

  if (!posterPath) {
    imageUrl = `http://placehold.it/300x500&text=${title}`;
  } else {
    imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  const handleCardClick = async () => {
    const detailedData =
      listType === 'tvshows'
        ? await getTVSeriesDetails(id)
        : await getMovieDetails(id);
    setSelectedMediaItem(detailedData);
  };

  return (
    <Link onClick={handleCardClick} to={`/details/${id}`} className="link">
      <div className="tmdb-card">
        <img className="poster-image-card" src={imageUrl} alt={title} />
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default Card;
