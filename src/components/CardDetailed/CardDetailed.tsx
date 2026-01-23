import { useState, useEffect } from 'react';
import { useList } from '../../hooks/useList';
import { TVShow, UnifiedMediaItem, Comment } from '../../types/types';
import '../../styles/CardDetailed.css';

import { useNavigate, useParams } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CommentsList from '../CommentsList/CommentsList';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../hooks/useAuth';
import {
  getMovieDetails,
  getMovieImages,
  getMovieVideos,
  getTVSeriesDetails,
  getTVSeriesImages,
  getTVSeriesVideos,
} from '../../requests/requests';

const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const CardDetailed = () => {
  const { context } = useList();
  const {
    selectedMediaItem,
    selectedVideos,
    selectedImages,
    loading,
    setLoading,
    setSelectedMediaItem,
    setSelectedVideos,
    setSelectedImages,
    listType,
  } = context;
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [comments, setComments] = useState<Comment[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentStatus, setCommentStatus] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!selectedMediaItem) {
        setComments([]);
        return;
      }

      const mediaType = isTVShow(selectedMediaItem) ? 'tvshows' : 'movies';

      const { data, error } = await supabase
        .from('comments')
        .select(
          'id, content, created_at, user_id, author_name, profiles ( username )'
        )
        .eq('media_id', selectedMediaItem.id)
        .eq('media_type', mediaType)
        .order('created_at', { ascending: false });

      if (error) {
        setCommentStatus(error.message);
        setComments([]);
        return;
      }

      const mapped = (data || []).map((row: any) => ({
        id: row.id,
        text: row.content,
        author: row.profiles?.username || row.author_name || 'Anonymous',
        created_at: row.created_at,
        user_id: row.user_id,
      }));

      setComments(mapped);
    };

    void fetchComments();
  }, [selectedMediaItem]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id || selectedMediaItem) return;

      const resolvedListType =
        listType || sessionStorage.getItem('tmdb:listType') || '';

      setLoading(true);
      setSelectedMediaItem(null);
      setSelectedVideos({});
      setSelectedImages({});

      const numericId = Number(id);
      if (Number.isNaN(numericId)) {
        setLoading(false);
        return;
      }

      const tryFetch = async (type: 'tvshows' | 'movies') => {
        const details =
          type === 'tvshows'
            ? await getTVSeriesDetails(numericId)
            : await getMovieDetails(numericId);
        if (!details) return null;

        const videos =
          type === 'tvshows'
            ? await getTVSeriesVideos(numericId)
            : await getMovieVideos(numericId);

        const images =
          type === 'tvshows'
            ? await getTVSeriesImages(numericId)
            : await getMovieImages(numericId);

        return { details, videos, images };
      };

      try {
        let result: {
          details: UnifiedMediaItem;
          videos: any;
          images: any;
        } | null = null;

        if (resolvedListType === 'tvshows' || resolvedListType === 'movies') {
          result = await tryFetch(resolvedListType);
        }

        if (!result) {
          result = (await tryFetch('tvshows')) || (await tryFetch('movies'));
        }

        if (result) {
          setSelectedMediaItem(result.details);
          setSelectedVideos(result.videos || {});
          setSelectedImages(result.images || {});
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchDetails();
  }, [
    id,
    selectedMediaItem,
    listType,
    setLoading,
    setSelectedMediaItem,
    setSelectedVideos,
    setSelectedImages,
  ]);

  const handleAddCommentClick = () => {
    if (!user) {
      setIsAnonymous(true);
    }
    setShowInput(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    const submit = async () => {
      if (!newComment.trim() || !selectedMediaItem) return;

      const mediaType = isTVShow(selectedMediaItem) ? 'tvshows' : 'movies';
      setCommentStatus('');

      const shouldPostAnonymous = !user || isAnonymous;

      if (user && !shouldPostAnonymous && !profile?.username) {
        setCommentStatus('Set a username before commenting.');
        navigate('/sign-in');
        return;
      }

      const { data, error } = await supabase
        .from('comments')
        .insert({
          user_id: shouldPostAnonymous ? null : user?.id ?? null,
          content: newComment.trim(),
          media_id: selectedMediaItem.id,
          media_type: mediaType,
          author_name: shouldPostAnonymous
            ? 'Anonymous'
            : profile?.username || user?.email || 'Anonymous',
        })
        .select('id, content, created_at, user_id, author_name')
        .single();

      if (error) {
        setCommentStatus(error.message);
        return;
      }

      const newCommentObj: Comment = {
        id: data.id,
        author:
          (shouldPostAnonymous
            ? data.author_name
            : profile?.username || user?.email) || 'Anonymous',
        text: data.content,
        created_at: data.created_at,
        user_id: data.user_id,
      };

      setComments([newCommentObj, ...comments]);
      setNewComment('');
      setShowInput(false);
      setIsAnonymous(false);
    };

    void submit();
  };

  const handleEditStart = (commentId: string, currentText: string) => {
    setEditingCommentId(commentId);
    setEditingText(currentText);
  };

  const handleEditSave = () => {
    const submit = async () => {
      if (!editingCommentId || !editingText.trim() || !user) return;

      const { data, error } = await supabase
        .from('comments')
        .update({ content: editingText.trim() })
        .eq('id', editingCommentId)
        .eq('user_id', user.id)
        .select('id, content')
        .single();

      if (error) {
        setCommentStatus(error.message);
        return;
      }

      setComments((prev) =>
        prev.map((comment) =>
          comment.id === data.id ? { ...comment, text: data.content } : comment
        )
      );
      setEditingCommentId(null);
      setEditingText('');
    };

    void submit();
  };

  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const handleDelete = (commentId: string) => {
    const submit = async () => {
      if (!user) return;

      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)
        .eq('user_id', user.id);

      if (error) {
        setCommentStatus(error.message);
        return;
      }

      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    };

    void submit();
  };

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

  const genreNames = selectedMediaItem.genres
    ? selectedMediaItem.genres.map((genre) => genre.name).join(', ')
    : 'No genre data';

  // const mockComments: Comment[] = [
  //   { id: 1, text: 'This is the first comment!', author: 'User1' },
  //   { id: 2, text: 'Great post!', author: 'User2' },
  //   { id: 3, text: 'Very informative.', author: 'User3' },
  //   { id: 4, text: 'Thanks for sharing!', author: 'User4' },
  //   { id: 5, text: 'I learned a lot.', author: 'User5' },
  //   { id: 6, text: 'Nice read.', author: 'User6' },
  //   { id: 7, text: 'Well explained.', author: 'User7' },
  //   { id: 8, text: 'Awesome article.', author: 'User8' },
  //   { id: 9, text: 'Keep it up!', author: 'User9' },
  //   { id: 10, text: 'Good job.', author: 'User10' },
  // ];

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
          {selectedMediaItem &&
            selectedMediaItem.genres &&
            selectedMediaItem.genres.length > 0 && (
              <p className="genres-text">{genreNames}</p>
            )}
          <p className="overview-text">
            {selectedMediaItem?.overview ||
              'No description for desired tv show/movie!'}
          </p>
        </div>
        <div className="comments">
          <h3 className="comment-intro">Comments</h3>
          <CommentsList
            comments={comments}
            currentUserId={user?.id}
            editingCommentId={editingCommentId}
            editingValue={editingText}
            onEditStart={handleEditStart}
            onEditChange={setEditingText}
            onEditSave={handleEditSave}
            onEditCancel={handleEditCancel}
            onDelete={handleDelete}
          />
          {commentStatus && <p className="comment-status">{commentStatus}</p>}
        </div>
        {showInput ? (
          <div className="comment-input">
            <input
              type="text"
              placeholder={`Comment as ${
                !user || isAnonymous
                  ? 'Anonymous'
                  : profile?.username || user.email
              }`}
              value={newComment}
              onChange={handleCommentChange}
            />
            {user && (
              <label className="comment-anon-toggle">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                Post anonymously
              </label>
            )}
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
        ) : (
          <span className="add-comment-btn" onClick={handleAddCommentClick}>
            Add comment
          </span>
        )}{' '}
      </div>
    </div>
  );
};

export default CardDetailed;
