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
  const { selectedMediaItem } = context;
  const navigate = useNavigate();

  if (!selectedMediaItem) {
    return <div>No item selected</div>;
  }

  const title = selectedMediaItem
    ? isTVShow(selectedMediaItem)
      ? selectedMediaItem.name
      : selectedMediaItem.title
    : '';

  const imageUrl = selectedMediaItem
    ? `https://image.tmdb.org/t/p/w500${selectedMediaItem.poster_path}`
    : '';

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="tmdb-card-detailed-page">
      <span onClick={handleBackClick} className="back-button">
        <IoArrowBackCircle size={70} />
      </span>
      <div className="card-detailed">
        {selectedMediaItem.video ? (
          <video
            className="trailer-video"
            src={selectedMediaItem.video}
            title={title}
          ></video>
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
