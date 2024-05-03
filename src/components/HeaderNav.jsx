import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderNav = ({ handleLogout, isLoggedIn }) => {
  return (
    <div className="flex justify-between items-center p-4 border-solid border-b-2 fixed w-full bg-primary">
      <h1 className="text-2xl font-bold text-background">Forum App</h1>
      <ul className="flex gap-4 text-background">
        <li>
          <Link to="/">
            <button className="py-1">treads</button>
          </Link>
        </li>
        <li>
          <Link to="/leaderboard">
            <button className="py-1">LeaderBoard</button>
          </Link>
        </li>
        {isLoggedIn ? (
          <li>
            <button
              className="bg-background text-primary px-5 py-1 rounded-md"
              onClick={handleLogout}
            >
              logout
            </button>
          </li>
        ) : (
          <li>
            <Link to="/login">
              <button className="bg-background text-primary px-5 py-1 rounded-md">
                login
              </button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default HeaderNav;

HeaderNav.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
