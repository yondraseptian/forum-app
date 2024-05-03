import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderBoard } from "../redux/slices/leaderboardSlice";
import { useEffect } from "react";

const LeaderBoardPage = () => {
  const dispatch = useDispatch();
  const leaderboards = useSelector((state) => state.leaderboard.leaderboard);
  //   const { status, error } = useSelector((state) => state.leaderboard);

  console.log(leaderboards);

  useEffect(() => {
    dispatch(fetchLeaderBoard());
  }, [dispatch]);
  return (
    <div>
      <h1>LeaderBoardPage</h1>
      <div>
        {/* {status === "loading" && <div>Loading...</div>}
        {status === "failed" && <div>Error: {error}</div>}
        {status === "succeeded" && ( */}
        <div>
          {leaderboards.map((leaderboard) => (
            <div
              className="flex justify-between w-full bg-primary text-white p-4 text-2xl"
              key={leaderboard.id}
            >
              <div>
                <img src="" alt="" className="w-10 rounded-full" />
                <span>yondra</span>
              </div>
              <p>100</p>
            </div>
          ))}
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default LeaderBoardPage;
