import { useContext } from 'react';
import { ListContext } from '../context/ListContext';

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  const {
    listItems,
    listType,
    fetchList,
    searchTerm,
    searchResults,
    setSearchTerm,
    search,
    selectedMediaItem,
    setSelectedMediaItem,
    loading,
  } = context;

  return {
    listItems,
    listType,
    fetchList,
    searchTerm,
    searchResults,
    setSearchTerm,
    search,
    selectedMediaItem,
    setSelectedMediaItem,
    loading,
  };
};
