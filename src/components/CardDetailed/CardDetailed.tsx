import { useList } from '../../hooks/useList';
import { TVShow, UnifiedMediaItem } from '../../types/types';

const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const CardDetailed = () => {
  const { context } = useList();
  const { selectedMediaItem } = context;

  if (!selectedMediaItem) {
    return <div>No item selected</div>;
  }

  const title = selectedMediaItem
    ? isTVShow(selectedMediaItem)
      ? selectedMediaItem.name
      : selectedMediaItem.title
    : '';
  const imageUrl = selectedMediaItem
    ? `https://image.tmdb.org/t/p/w300${selectedMediaItem.poster_path}`
    : '';

  return (
    <div className="tmdb-card-detailed">
      {selectedMediaItem.video ? (
        <iframe
          className="trailer-video"
          src={selectedMediaItem.video}
          title={title}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      ) : (
        <img className="poster-image" src={imageUrl} alt={title} />
      )}
      <div className="movie-details">
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default CardDetailed;
