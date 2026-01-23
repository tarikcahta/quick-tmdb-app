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
  id: string;
  author: string;
  text: string;
  created_at?: string;
  user_id?: string;
}

export interface CommentProps {
  author: string;
  text: string;
  isOwner?: boolean;
  isEditing?: boolean;
  editValue?: string;
  onEditStart?: () => void;
  onEditChange?: (value: string) => void;
  onEditSave?: () => void;
  onEditCancel?: () => void;
  onDelete?: () => void;
}

export interface CommentsListProps {
  comments: Comment[];
  currentUserId?: string | null;
  editingCommentId?: string | null;
  editingValue?: string;
  onEditStart?: (commentId: string, currentText: string) => void;
  onEditChange?: (value: string) => void;
  onEditSave?: () => void;
  onEditCancel?: () => void;
  onDelete?: (commentId: string) => void;
}

export interface Profile {
  id: string;
  username: string | null;
  email?: string | null;
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
