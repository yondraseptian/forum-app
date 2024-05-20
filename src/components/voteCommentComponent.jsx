import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  downVoteCommentAsync,
  neutralizeCommentVoteAsync,
  upVoteCommentAsync,
} from "../redux/slices/votes/votesSlice";

const VotesCommentComponent = ({ threadId, comment }) => {
  const dispatch = useDispatch();
  const [voteType, setVoteType] = useState(0);
  const [upVotesCount, setUpVotesCount] = useState(comment.upVotesBy.length);
  const [downVotesCount, setDownVotesCount] = useState(
    comment.downVotesBy.length
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.users.profile?.id);

  useEffect(() => {
    if (comment) {
      setVoteType(getVoteTypeForUser(comment));
      setUpVotesCount(comment.upVotesBy.length);
      setDownVotesCount(comment.downVotesBy.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment]);

  const getVoteTypeForUser = (comment) => {
    if (userId) {
      if (comment.upVotesBy.includes(userId)) {
        return 1;
      } else if (comment.downVotesBy.includes(userId)) {
        return -1;
      }
    }
    return 0;
  };

  const id = comment.id;

  const handleVote = async (vote) => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    switch (vote) {
      case 1:
        if (voteType === 1) {
          await dispatch(neutralizeCommentVoteAsync({ threadId, commentId:id }));
          setVoteType(0);
          setUpVotesCount(upVotesCount - 1);
        } else {
          await dispatch(upVoteCommentAsync({ threadId, commentId:id }));
          setVoteType(1);
          setUpVotesCount(upVotesCount + 1);
          if (voteType === -1) {
            setDownVotesCount(downVotesCount - 1);
          }
        }
        break;
      case -1:
        if (voteType === -1) {
          await dispatch(neutralizeCommentVoteAsync({ threadId, commentId:id }));
          setVoteType(0);
          setDownVotesCount(downVotesCount - 1);
        } else {
          await dispatch(downVoteCommentAsync({ threadId, commentId:id }));
          setVoteType(-1);
          setDownVotesCount(downVotesCount + 1);
          if (voteType === 1) {
            setUpVotesCount(upVotesCount - 1);
          }
        }
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex gap-4">
      <button className="flex items-center" onClick={() => handleVote(1)}>
        {!isLoggedIn ? (
          <AiOutlineLike />
        ) : voteType === 1 ? (
          <AiFillLike />
        ) : (
          <AiOutlineLike />
        )}
        <span>{upVotesCount}</span>
      </button>
      <button className="flex items-center" onClick={() => handleVote(-1)}>
        {!isLoggedIn ? (
          <AiOutlineDislike />
        ) : voteType === -1 ? (
          <AiFillDislike />
        ) : (
          <AiOutlineDislike />
        )}
        <span>{downVotesCount}</span>
      </button>
    </div>
  );
};

export default VotesCommentComponent;

VotesCommentComponent.propTypes = {
  comment: PropTypes.object.isRequired,
  threadId: PropTypes.string.isRequired,
};
