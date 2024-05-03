import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { createThreadAsync } from "../redux/slices/threadsSlice";
import { useNavigate } from "react-router-dom";

const AddThread = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const handleCreateThread = () => {
    if (title === "" || body === "") {
      alert("judul dan isi harus diisi");
      return;
    }
    const threadData = {
      title: title,
      body: body,
      category: category,
    };

    dispatch(createThreadAsync(threadData));

    setTitle("");
    setCategory("");
    setBody("");
    navigate("/");
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mx-5">Buat diskusi baru</h1>
      <div className="p-5">
        <Input
          type="text"
          className="border-solid border-2 p-2 mb-2 rounded-md"
          placeholder="Judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
          {""}
        </Input>
        <Input
          type="text"
          className="border-solid border-2 p-2 mb-2 rounded-md"
          placeholder="Kategori"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {""}
        </Input>
        <textarea
          name="isi"
          className="border-solid border-2 p-2 mb-2 rounded-md w-full"
          placeholder="Isi"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
        ></textarea>
        <Button
          className="bg-primary text-white my-3 w-full py-3 rounded-md"
          onClick={handleCreateThread}
        >
          Buat
        </Button>
      </div>
    </div>
  );
};

export default AddThread;
