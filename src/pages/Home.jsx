// import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListTreads from "../components/ListTreads";
import { useEffect } from "react";
import { fetchThreads } from "../redux/slices/threadsSlice";
import { fetchUsers } from "../redux/slices/userSlice";
import { Link } from "react-router-dom";
// import { getThreads } from "../utils/api";

const Home = () => {
  const dispatch = useDispatch();
  const threads = useSelector((state) => state.threads.threads);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchThreads());
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div className="h-full">
      <header>
        <h2>kategori</h2>
      </header>
      <div>
        <h1 className="text-2xl font-bold pl-2 pb-4 pt-7">diskusi tersedia</h1>
        <ListTreads threads={threads} users={users} />
      </div>
      <Link to="/add-thread">
        <button className="fixed bottom-8 right-8 bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg">
          Add Thread
        </button>
      </Link>
    </div>
  );
};

export default Home;
