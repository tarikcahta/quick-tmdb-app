import { useList } from '../../hooks/useList';
import { TVShow, UnifiedMediaItem } from '../../types/types';
import '../../styles/CardDetailed.css';

import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';

const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const CardDetailed = () => {
  const { context } = useList();
  const { selectedMediaItem, selectedVideos } = context;
  const navigate = useNavigate();

  let videoUrl;
  let imageUrl;

  if (!selectedMediaItem) {
    return <div className="no-item">No item selected</div>;
  }

  const title = selectedMediaItem
    ? isTVShow(selectedMediaItem)
      ? selectedMediaItem.name
      : selectedMediaItem.title
    : '';

  if (!selectedMediaItem.poster_path) {
    imageUrl = `http://placehold.it/300x500&text=${title}`;
  } else {
    imageUrl = `https://image.tmdb.org/t/p/w500${selectedMediaItem.poster_path}`;
  }

  if (selectedVideos !== undefined) {
    videoUrl = `https://www.youtube.com/embed/${selectedVideos.key}`;
  } else {
    videoUrl = null;
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="tmdb-card-detailed-page">
      <span onClick={handleBackClick} className="back-button">
        <IoArrowBackCircle size={70} />
      </span>
      <div className="card-detailed">
        {videoUrl !== null ? (
          <iframe
            className="trailer-video"
            src={videoUrl}
            title={title}
            allowFullScreen={true}
          ></iframe>
        ) : (
          <img className="poster-image" src={imageUrl} alt={title} />
        )}
        <div className="movie-details">
          <h2>{title}</h2>
          {selectedMediaItem.genres && (
            <p className="genres-text">
              {selectedMediaItem.genres.map((genre) => (
                <span key={genre.id}>{genre.name}, </span>
              ))}
            </p>
          )}
          <p className="overview-text">{selectedMediaItem.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetailed;
