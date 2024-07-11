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
    selectedMediaItem,
    listType,
    loading,
    setLoading,
  } = context;

  let imageUrl;

  if (!posterPath) {
    imageUrl = `http://placehold.it/300x500&text=${title}`;
  } else {
    imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
  }

  const handleCardClick = async () => {
    if (selectedMediaItem && selectedMediaItem.id === id) {
      return;
    }

    setLoading(true);
    setSelectedMediaItem(null);
    setSelectedVideos({});
    setSelectedImages({});

    try {
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

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSelectedMediaItem(detailedData);
      setSelectedVideos(videoData);
      setSelectedImages(imageData);
    } catch (err) {
      console.error('Error fetching data:', err);

      setSelectedMediaItem(null);
    } finally {
      setLoading(false);
    }
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
