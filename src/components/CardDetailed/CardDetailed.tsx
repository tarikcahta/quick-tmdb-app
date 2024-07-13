import { useState, useEffect } from 'react';
import { useList } from '../../hooks/useList';
import { TVShow, UnifiedMediaItem, Comment } from '../../types/types';
import '../../styles/CardDetailed.css';

import { useNavigate } from 'react-router-dom';
import { IoArrowBackCircle } from 'react-icons/io5';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import CommentsList from '../CommentsList/CommentsList';

const isTVShow = (item: UnifiedMediaItem): item is TVShow => {
  return 'name' in item;
};

const CardDetailed = () => {
  const { context } = useList();
  const { selectedMediaItem, selectedVideos, selectedImages, loading } =
    context;
  const navigate = useNavigate();

  // mock logic
  const [comments, setComments] = useState<Comment[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (selectedMediaItem) {
      // Fetch or set mock comments for the selected media item
      const mockComments: Comment[] = [
        { id: 1, text: 'This is the first comment!', author: 'User1' },
        { id: 2, text: 'Great post!', author: 'User2' },
        { id: 3, text: 'Very informative.', author: 'User3' },
        { id: 4, text: 'Thanks for sharing!', author: 'User4' },
        { id: 5, text: 'I learned a lot.', author: 'User5' },
        { id: 6, text: 'Nice read.', author: 'User6' },
        { id: 7, text: 'Well explained.', author: 'User7' },
        { id: 8, text: 'Awesome article.', author: 'User8' },
        { id: 9, text: 'Keep it up!', author: 'User9' },
        { id: 10, text: 'Good job.', author: 'User10' },
      ];
      setComments(mockComments);
    }
  }, [selectedMediaItem]);

  const handleAddCommentClick = () => {
    setShowInput(true);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim() === '') return;

    const newCommentObj: Comment = {
      id: comments.length + 1,
      author: 'CurrentUser', // Replace with the actual current user's name
      text: newComment,
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
    setShowInput(false);
  };

  //

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
          <CommentsList comments={comments} />
        </div>
        {showInput ? (
          <div className="comment-input">
            <input
              type="text"
              placeholder="Comment as CurrentUser"
              value={newComment}
              onChange={handleCommentChange}
            />
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
