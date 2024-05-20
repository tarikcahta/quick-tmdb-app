import { Link } from 'react-router-dom';

import '../../styles/Card.css';
import { CardProps } from '../../types/types';
import { useList } from '../../hooks/useList';
import {
  getMovieDetails,
  getMovieImages,
  getMovieVideos,
  getTVSeriesDetails,
  getTVSeriesImages,
  getTVSeriesVideos,
} from '../../requests/requests';

const Card: React.FC<CardProps> = ({ posterPath, title, id }) => {
  const { context } = useList();
  const {
    setSelectedMediaItem,
    setSelectedVideos,
    setSelectedImages,
    listType,
  } = context;

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

    const videoData =
      listType === 'tvshows'
        ? await getTVSeriesVideos(id)
        : await getMovieVideos(id);

    const imageData =
      listType === 'tvshows'
        ? await getTVSeriesImages(id)
        : await getMovieImages(id);

    setSelectedMediaItem(detailedData);
    setSelectedVideos(videoData);
    setSelectedImages(imageData);
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
