import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderBoard } from "../redux/slices/leaderboardSlice";
import { useEffect } from "react";

const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboard.leaderboards);
  const { status, error } = useSelector((state) => state.leaderboard);

  useEffect(() => {
    dispatch(fetchLeaderBoard());
  }, [dispatch]);
  return (
    <div>
      <h1 className="text-4xl pb-4 ml-3">LeaderBoardPage</h1>
      <div>
        {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" && (
          <div className="flex flex-col gap-4 px-3">
            {leaderboards.map((leaderboard) => (
              <div
                className="flex justify-between w-full bg-primary text-white p-4 text-2xl rounded-md"
                key={leaderboard.user.id}
              >
                <div>
                  <img src="" alt="" className="w-10 rounded-full" />
                  <span>{leaderboard.user.name}</span>
                </div>
                <p>{leaderboard.score}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
