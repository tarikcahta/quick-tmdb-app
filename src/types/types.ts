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

export type PosterImage = {
  aspect_ratio?: number;
  height?: number;
  iso_639_1?: string;
  file_path?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
};

export interface Comment {
  id: number;
  author: string;
  text: string;
}

export interface CommentProps {
  author: string;
  text: string;
}

export interface CommentsListProps {
  comments: Comment[];
}

export interface ListContextProps {
  listType: string;
  listItems: (TVShow | Movie)[];
  fetchList: (type: string) => Promise<void>;
  loading?: boolean;
  setLoading: (loading: boolean) => void;
  searchTerm: string;
  searchResults: UnifiedMediaItem[];
  setSearchTerm: (term: string) => Promise<void> | void;
  search: (query: string) => Promise<void>;
  selectedMediaItem: UnifiedMediaItem | undefined | null;
  setSelectedMediaItem: (item: UnifiedMediaItem | undefined | null) => void;
  selectedVideos: Video;
  setSelectedVideos: (item: Video) => void;
  selectedImages: PosterImage;
  setSelectedImages: (item: PosterImage) => void;
}

export interface TMDBSearchResponse {
  results: UnifiedMediaItem[];
}

export interface TMDBResponse {
  results: UnifiedMediaItem[];
}
