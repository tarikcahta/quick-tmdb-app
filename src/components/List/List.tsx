import '../../styles/List.css';
import { UnifiedMediaItem, TVShow } from '../../types/types';
import { useList } from '../../hooks/useList';
import Card from '../Card/Card';


const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const List = () => {
  const { context } = useList();
  const { listItems, loading, searchTerm, searchResults } = context;

  // const itemsToRender = searchTerm.length >= 3 ? searchResults : listItems;

  const maxItemsToRender = 10;
  const itemsToRender =
    searchTerm.length >= 3
      ? searchResults.slice(0, maxItemsToRender)
      : listItems.slice(0, maxItemsToRender);

  if (!listItems || listItems.length === 0) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading..</div>;
  }

  if (!itemsToRender.length) {
    return <div>No results found.</div>;
  }

  return (
    <div className="list">
      {itemsToRender.map((item: UnifiedMediaItem) => (
        <Card
          key={item.id}
          id={item.id}
          title={isTVShow(item) ? item.name : item.title}
          posterPath={item.poster_path}
        />
      ))}
    </div>
  );
};

export default List;
