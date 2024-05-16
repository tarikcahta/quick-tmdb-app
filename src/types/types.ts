export type CardProps = {
  posterPath: string;
  title: string;
  id: number;
};

export interface TVShow {
  id: number;
  name: string;
  poster_path: string;
  video?: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  video?: string;
}

export type UnifiedMediaItem = TVShow | Movie;

export interface ListProps {
  tvShows: TVShow[];
}

export interface ListProviderProps {
  children: React.ReactNode;
}

export interface ListContextProps {
  listType: string;
  listItems: (TVShow | Movie)[];
  fetchList: (type: string) => Promise<void>;
  loading?: boolean;
  searchTerm: string;
  searchResults: UnifiedMediaItem[];
  setSearchTerm: (term: string) => Promise<void> | void;
  search: (query: string) => Promise<void>;
  selectedMediaItem: UnifiedMediaItem | undefined | null;
  setSelectedMediaItem: (item: UnifiedMediaItem | undefined | null) => void;
}

export interface TMDBSearchResponse {
  results: UnifiedMediaItem[];
}

export interface TMDBResponse {
  results: UnifiedMediaItem[];
}
