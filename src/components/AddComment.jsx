/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable import/no-extraneous-dependencies */
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { Button } from './Button';
import { createCommentAsync } from '../redux/slices/comments/commentSlice';

function AddComment({ isLoggedIn, threadId, onCommentAdded }) {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleCreateComment = async () => {
    if (!comment.trim()) {
      alert('isi comment');
      return;
    }

    const commentData = {
      content: comment,
    };

    try {
      await dispatch(createCommentAsync({ threadId, commentData }));
      setComment('');
      onCommentAdded();
    } catch (error) {
      alert(`gagal menambahkan comment${error.massage}`);
    }
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold pb-3">Beri Komentar</h2>
      {isLoggedIn ? (
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name=""
            className="border-solid border-2 p-2 h-40 rounded-lg w-full"
            id=""
            cols="30"
            rows="10"
          />
          <Button
            className="bg-primary text-white my-3 w-full py-3 rounded-md"
            onClick={handleCreateComment}
          >
            komentar
          </Button>
        </div>
      ) : (
        <p className="text-center">
          <span className="font-bold text-primary underline">
            <Link to="/login">Login</Link>
          </span>
          {' '}
          terlebih dahulu untuk memberi komentar
          {' '}
        </p>
      )}
    </div>
  );
}

export default AddComment;

AddComment.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  threadId: PropTypes.string.isRequired,
  onCommentAdded: PropTypes.func.isRequired,
};
