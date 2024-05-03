// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTreads from "../components/ListTreads";
import { useEffect, useState } from "react";
import { fetchThreads } from "../redux/slices/threadsSlice";
import { fetchProfile, fetchUsers } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.threads);
  const users = useSelector((state) => state.users.users);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchProfile(localStorage.getItem("token")));
    dispatch(fetchUsers());
  }, [dispatch]);

  const filterByCategory = (category) => {
    setSelectedCategory((prevCategory) => {
      if (prevCategory == category) {
        return null;
      } else {
        return category;
      }
    });
  };

  const filteredThread = selectedCategory
    ? threads.filter((thread) => thread.category === selectedCategory)
    : threads;

  return (
    <div className="h-full">
      <div className="mx-4">
        <h2 className="text-xl font-semibold mb-1">kategori</h2>
        <ul className="flex flex-row">
          {threads.map((thread) => (
            <li key={thread.id} className="px-1">
              <button
                className={`text-primary border-solid border-2 border-primary px-4 py-2 rounded-full shadow-lg  ${
                  thread.category === selectedCategory
                    ? "bg-primary text-white"
                    : ""
                }`}
                onClick={() => filterByCategory(thread.category)}
              >
                #{thread.category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className="text-2xl font-bold pl-2 pb-4 pt-7">diskusi tersedia</h1>
        <ListTreads threads={filteredThread} users={users} />
      </div>
      {isLoggedIn ? (
        <Link to="/new">
          <button className="fixed bottom-8 right-8 bg-primary text-white px-4 py-2 rounded-full shadow-lg">
            Add Thread
          </button>
        </Link>
      ) : null}
    </div>
  );
};

export default Home;
