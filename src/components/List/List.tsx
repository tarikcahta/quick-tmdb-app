import { UnifiedMediaItem, TVShow } from '../../types/types';
import { useList } from '../../hooks/useList';
import { useEffect } from 'react';
import Card from '../Card/Card';

const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const List = () => {
  const { context } = useList();
  const { listItems, listType, fetchList, loading, searchTerm, searchResults } =
    context;

  useEffect(() => {
    if (listType) {
      fetchList(listType);
    }

    if (!searchTerm || searchTerm.length <= 3) {
      fetchList(listType);
    }
  }, [listType, searchTerm, fetchList]);

  const itemsToRender = searchTerm.length >= 3 ? searchResults : listItems;

  if (!listItems || listItems.length === 0) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!itemsToRender.length) {
    return <div>No results found.</div>;
  }

  return (
    <div className="homepage">
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
