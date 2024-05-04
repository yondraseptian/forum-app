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
  downVoteThreadAsync,
  neutralizeThreadVoteAsync,
  upVoteThreadAsync,
} from "../redux/slices/votesSlice.js";

const VotesComponent = ({ thread, id }) => {
  const dispatch = useDispatch();
  const [voteType, setVoteType] = useState(0);
  const [upVotesCount, setUpVotesCount] = useState(thread.upVotesBy.length);
  const [downVotesCount, setDownVotesCount] = useState(
    thread.downVotesBy.length
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.users.profile?.id);

  useEffect(() => {
    if (thread) {
      setVoteType(getVoteTypeForUser(thread));
      setUpVotesCount(thread.upVotesBy.length);
      setDownVotesCount(thread.downVotesBy.length);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread]);

  const getVoteTypeForUser = (thread) => {
    if (userId) {
      if (thread.upVotesBy.includes(userId)) {
        return 1;
      } else if (thread.downVotesBy.includes(userId)) {
        return -1;
      }
    }
    return 0;
  };

  const handleVote = async (vote) => {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu");
      return;
    }

    switch (vote) {
      case 1:
        if (voteType === 1) {
          await dispatch(neutralizeThreadVoteAsync(id));
          setVoteType(0);
          setUpVotesCount(upVotesCount - 1);
        } else {
          await dispatch(upVoteThreadAsync(id));
          setVoteType(1);
          setUpVotesCount(upVotesCount + 1);
          if (voteType === -1) {
            setDownVotesCount(downVotesCount - 1);
          }
        }
        break;
      case -1:
        if (voteType === -1) {
          await dispatch(neutralizeThreadVoteAsync(id));
          setVoteType(0);
          setDownVotesCount(downVotesCount - 1);
        } else {
          await dispatch(downVoteThreadAsync(id));
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

export default VotesComponent;

VotesComponent.propTypes = {
  thread: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
