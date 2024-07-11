import { useList } from '../../hooks/useList';
import { TVShow, UnifiedMediaItem } from '../../types/types';
import '../../styles/CardDetailed.css';

import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const CardDetailed = () => {
  const { context } = useList();
  const { selectedMediaItem, selectedVideos, selectedImages, loading } =
    context;
  const navigate = useNavigate();

  let videoUrl;
  let imageUrl;

  const title = selectedMediaItem
    ? isTVShow(selectedMediaItem)
      ? selectedMediaItem.name
      : selectedMediaItem.title
    : '';

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!selectedMediaItem) {
    return (
      <div className="no-item">
        <span onClick={handleBackClick} className="back-button">
          <IoArrowBackCircle size={70} />
        </span>
        No information about movie/tv show!
      </div>
    );
  }

  if (!selectedImages) {
    imageUrl = `http://placehold.it/300x500&text=${title}`;
  } else {
    imageUrl = `https://image.tmdb.org/t/p/original${selectedImages.file_path}`;
  }

  if (selectedVideos !== undefined) {
    videoUrl = `https://www.youtube.com/embed/${selectedVideos.key}`;
  } else {
    videoUrl = null;
  }

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
