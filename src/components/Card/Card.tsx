import { Link } from 'react-router-dom';

import { CardProps } from '../../types/types';
import { useList } from '../../hooks/useList';
import { getMovieDetails, getTVSeriesDetails } from '../../requests';

const Card: React.FC<CardProps> = ({ posterPath, title, id }) => {
  const { context } = useList();
  const { setSelectedMediaItem, listType } = context;

  const imageUrl = `https://image.tmdb.org/t/p/w300${posterPath}`;

  const handleCardClick = async () => {
    const detailedData =
      listType === 'tvshows'
        ? await getTVSeriesDetails(id)
        : await getMovieDetails(id);
    setSelectedMediaItem(detailedData);
  };

  return (
    <Link onClick={handleCardClick} to={`/details/${id}`}>
      <div className="tmdb-card">
        <img className="poster-image" src={imageUrl} alt="" />
        <p>{title}</p>
      </div>
    </Link>
  );
};

export default Card;
