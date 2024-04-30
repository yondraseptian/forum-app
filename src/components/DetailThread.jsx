import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaRegComments } from "react-icons/fa6";
import { formatDate } from "../utils/dateFormat";
import PropTypes from "prop-types";
import { Input } from "./Input";
import { Button } from "./Button";
import { fetchThreadsById } from "../redux/slices/threadsSlice";

const DetailThread = ({ isLoggedIn }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const thread = useSelector((state) =>
    state.threads.detailThread.find((t) => t.id === id)
  );

  useEffect(() => {
    dispatch(fetchThreadsById(id));
  }, [dispatch, id]);

  if (!thread) {
    return <div>Loading...</div>;
  }
  return (
    <div className="p-4">
      <h1 className="text-4xl font-semibold pb-3">{thread.title}</h1>
      <p
        className="text-lg pb-3"
        dangerouslySetInnerHTML={{ __html: thread.body }}
      ></p>
      <div className="flex gap-4 pb-4">
        <button className="flex items-center">
          <AiOutlineLike />
          <span>{thread.upVotesBy.length}</span>
        </button>
        <button className="flex items-center">
          <AiOutlineDislike />
          <span>{thread.downVotesBy.length}</span>
        </button>
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
      <h2 className="text-2xl font-semibold pb-3">Beri Komentar</h2>
      {isLoggedIn ? (
        <div>
          <Input
            type="text"
            className="border-solid border-2 p-2 h-40 rounded-lg"
            value=""
            onChange={() => {}}
          > komentar</Input>
          <Button className="bg-primary text-white my-3 w-full py-3 rounded-md" onClick={() => {}}>
            komentar
          </Button>
        </div>
      ) : (
        <p className="text-center">
          <span className="font-bold text-primary underline">
            <Link to="/login">Login</Link>
          </span>{" "}
          terlebih dahulu untuk memberi komentar{" "}
        </p>
      )}
      <h2 className="text-2xl font-semibold pb-3">
        Komentar({thread.comments.length})
      </h2>
      <div>
        {thread.comments.map((comment) => (
          <div className="flex justify-between pb-4" key={comment.id}>
            <div>
              <div className="flex gap-2">
              <img src={comment.owner.avatar} alt="" className="w-6 h-6 rounded-full" />
                <span className="font-bold"> {comment.owner.name}</span>
              </div>
              <p
                className="text-lg"
                dangerouslySetInnerHTML={{ __html: comment.content }}
              ></p>
            </div>
            <p>{formatDate(comment.createdAt)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailThread;

DetailThread.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
