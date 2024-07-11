import { createContext, useState, useEffect, useCallback } from 'react';
import {
  getTVShows,
  getMovies,
  searchTVShows,
  searchMovies,
} from '../requests/requests';
import {
  ListProviderProps,
  Movie,
  ListContextProps,
  TVShow,
  UnifiedMediaItem,
  Video,
  PosterImage,
} from '../types/types';

export const ListContext = createContext<ListContextProps>({
  listItems: [],
  listType: 'tvshows',
  fetchList: async () => {},
  searchTerm: '',
  searchResults: [],
  setSearchTerm: () => {},
  search: async () => {},
  selectedMediaItem: null,
  setSelectedMediaItem: () => {},
  loading: false,
  setLoading: () => {},
  selectedVideos: {},
  setSelectedVideos: () => {},
  selectedImages: {},
  setSelectedImages: () => {},
});

export const ListProvider = ({ children }: ListProviderProps) => {
  const [listType, setListType] = useState('');
  const [listItems, setListItems] = useState<(TVShow | Movie)[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UnifiedMediaItem[]>([]);
  const [selectedMediaItem, setSelectedMediaItem] = useState<
    UnifiedMediaItem | undefined | null
  >(null);
  const [selectedVideos, setSelectedVideos] = useState<Video>({});
  const [selectedImages, setSelectedImages] = useState<PosterImage>({});

  const fetchList = useCallback(async (type: string) => {
    setLoading(true);
    setListType(type);

    try {
      if (!loading) {
        const data =
          type === 'tvshows' ? await getTVShows() : await getMovies();
        if (data) {
          setListItems(data);
        } else {
          setListItems([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(
    async (query: string) => {
      if (query.length >= 3) {
        const results =
          listType === 'tvshows'
            ? await searchTVShows(query)
            : await searchMovies(query);
        setSearchResults(results || []);
      }
    },
    [listType]
  );

  const performSearch = async () => {
    if (searchTerm.length >= 3) {
      await search(searchTerm);
    } else {
      setSearchResults([]);
      if (searchTerm.length === 0) {
        setTimeout(async () => {
          await fetchList(listType);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    const debounceSearch =
      searchTerm.length !== 0
        ? setTimeout(() => {
            performSearch();
          }, 1000)
        : null;

    return () => {
      if (debounceSearch) {
        clearTimeout(debounceSearch);
      }
    };
  }, [searchTerm, search, fetchList, listType]);

  return (
    <ListContext.Provider
      value={{
        listItems,
        listType,
        fetchList,
        searchTerm,
        searchResults,
        setSearchTerm,
        search,
        loading,
        setLoading,
        selectedMediaItem,
        setSelectedMediaItem,
        selectedVideos,
        setSelectedVideos,
        selectedImages,
        setSelectedImages,
      }}
    >
      {children}
    </ListContext.Provider>
  );
};
