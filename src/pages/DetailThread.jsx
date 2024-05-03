import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { FaRegComments } from "react-icons/fa6";
import { formatDate } from "../utils/dateFormat";
import { fetchThreadsById } from "../redux/slices/threadsSlice";
import AddComment from "../components/AddComment";
import { fetchProfile } from "../redux/slices/userSlice";
import VotesComponent from "../components/VotesComponent";
import VotesCommentComponent from "../components/voteCommentComponent";

const DetailThread = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector((state) =>
    state.threads.detailThread.find((t) => t.id === id)
  );
  const { status, error } = useSelector((state) => state.threads);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const [commentAdded, setCommentAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchThreadsById(id));
    dispatch(fetchProfile(localStorage.getItem("token")));
  }, [dispatch, id]);

  useEffect(() => {
    if (commentAdded) {
      dispatch(fetchThreadsById(id));
      setCommentAdded(false);
    }
  }, [commentAdded, dispatch, id]);

  const handleCommentAdded = () => {
    setCommentAdded(true);
  };
  return (
    <div className="p-4">
      {status === "loading" && <div>Loading...</div>}
      {status === "failed" && <div>Error: {error}</div>}
      {status === "succeeded" && (
        <div>
          <h1 className="text-4xl font-semibold pb-3">{thread.title}</h1>
          <p
            className="text-lg pb-3"
            dangerouslySetInnerHTML={{ __html: thread.body }}
          ></p>
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
              <span className="font-bold"> {thread.owner.name}</span>
            </div>
          </div>
          <AddComment
            isLoggedIn={isLoggedIn}
            threadId={id}
            onCommentAdded={handleCommentAdded}
          />
          <h2 className="text-2xl font-semibold pb-3">
            Komentar({thread.comments.length})
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
                      <span className="font-bold"> {comment.owner.name}</span>
                    </div>
                    <p
                      className="text-lg"
                      dangerouslySetInnerHTML={{ __html: comment.content }}
                    ></p>
                  </div>
                  <p>{formatDate(comment.createdAt)}</p>
                </div>
                <VotesCommentComponent comment={comment} id={comment.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailThread;
