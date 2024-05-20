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
  genres?: {
    id: number;
    name: string;
  }[];
  overview?: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  video?: string;
  genres?: {
    id: number;
    name: string;
  }[];
  overview?: string;
}

export type UnifiedMediaItem = TVShow | Movie;

export interface ListProps {
  tvShows: TVShow[];
}

export interface ListProviderProps {
  children: React.ReactNode;
}

export type Video = {
  name?: string;
  key?: string;
  site?: string;
  size?: number;
  type?: string;
  official?: boolean;
  id?: string;
};

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
  selectedVideos: Video;
  setSelectedVideos: (item: Video) => void;
}

export interface TMDBSearchResponse {
  results: UnifiedMediaItem[];
}

export interface TMDBResponse {
  results: UnifiedMediaItem[];
}
