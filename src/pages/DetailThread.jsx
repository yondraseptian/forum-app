/* eslint-disable linebreak-style */
/* eslint-disable react/no-danger */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FaRegComments } from 'react-icons/fa6';
import { formatDate } from '../utils/dateFormat';
import { fetchThreadsById } from '../redux/slices/thread/threadsSlice';
import AddComment from '../components/AddComment';
import { fetchProfile } from '../redux/slices/users/userSlice';
import VotesComponent from '../components/VotesComponent';
import VotesCommentComponent from '../components/voteCommentComponent';

function DetailThread() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector((state) => state.threads.detailThread.find((t) => t.id === id));
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchThreadsById(id));
    dispatch(fetchProfile(localStorage.getItem('token')));
  }, [dispatch, id]);

  useEffect(() => {
    if (commentAdded) {
      dispatch(fetchThreadsById(id));
      setCommentAdded(false);
    }
  }, [commentAdded, dispatch, id]);

  if (!thread) {
    return <div>Loading...</div>;
  }

  const handleCommentAdded = () => {
    setCommentAdded(true);
  };

  return (
    <div className="p-4">
      <div>
        <h1 className="text-4xl font-semibold pb-3">{thread.title}</h1>
        <p
          className="text-lg pb-3"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />
        <div className="flex gap-4 pb-4 text-xl">
          <VotesComponent thread={thread} id={id} />
          <button className="flex items-center">
            <FaRegComments />
            <span>{thread.totalComments}</span>
          </button>
          <p>{formatDate(thread.createdAt)}</p>
          <p>dibuat oleh</p>
          <div className="flex gap-2">
            <img
              src={thread.owner.avatar}
              alt=""
              className="w-6 h-6 rounded-full"
            />
            <span className="font-bold">
              {' '}
              {thread.owner.name}
            </span>
          </div>
        </div>
        <AddComment
          isLoggedIn={isLoggedIn}
          threadId={id}
          onCommentAdded={handleCommentAdded}
        />
        <h2 className="text-2xl font-semibold pb-3">
          Komentar(
          {thread.comments.length}
          )
        </h2>
        <div>
          {thread.comments.map((comment) => (
            <div
              className="border-solid border-b-2 p-2 w-full"
              key={comment.id}
            >
              <div className="flex justify-between pb-4">
                <div>
                  <div className="flex gap-2">
                    <img
                      src={comment.owner.avatar}
                      alt=""
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="font-bold">
                      {' '}
                      {comment.owner.name}
                    </span>
                  </div>
                  <p
                    className="text-lg"
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  />
                </div>
                <p>{formatDate(comment.createdAt)}</p>
              </div>
              <VotesCommentComponent threadId={id} comment={comment} id={comment.id} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailThread;
