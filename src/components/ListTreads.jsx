import { formatDate } from "../utils/dateFormat";
import { FaRegComments } from "react-icons/fa6";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import VotesComponent from "./VotesComponent";

const ListTreads = (props) => {
  const { threads, users } = props;

  return (
    <>
      {threads.map((thread) => {
        const owner = users.find((user) => user.id === thread.ownerId);
        return (
          <div className="justify-start flex px-6" key={thread.id}>
            <div className="border-solid border-b-2 p-2 w-full">
              <p className="text-base font-medium border-solid border-2 px-2 py-1 w-fit border-primary rounded-lg">#{thread.category}</p>
              <Link to={`/threads/${thread.id}`}>
                <h1 className="text-xl font-bold cursor-pointer">
                  {thread.title}
                </h1>
              </Link>
              <p
                className="text-base"
                dangerouslySetInnerHTML={{
                  __html:
                    thread.body.length > 250
                      ? `${thread.body.slice(0, 250)}.....`
                      : thread.body,
                }}
              />
              <div className="flex gap-4 text-xl">
                <VotesComponent thread={thread} id={thread.id} />
                <button className="flex items-center">
                  <FaRegComments />
                  <span>{thread.totalComments}</span>
                </button>
                <p>{formatDate(thread.createdAt)}</p>
                {owner && (
                  <p>
                    dibuat oleh <b>{owner.name}</b>
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ListTreads;

ListTreads.propTypes = {
  threads: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
};
