import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUpload from "./ImageUpload";

const CreatePost = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  //Text editor module and formats
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleFileInput = (file: any) => {
    console.log(file.name);
    setCoverImage(file);
    console.log(coverImage);
  };
  const createPost = (e) => {
    e.preventDefault();
    console.log(title, content);
  };
  return (
    <>
      <div className="bg-primary-bg text-primary-text dark:bg-darkMode-bg dark:text-darkMode-text w-full min-h-screen h-auto">
        <div className="flex items-center justify-between px-12 p-8 text-2xl">
          <h1 className="cursor-pointer" onClick={() => navigate("/")}>
            Bloghub
          </h1>
          <div className="cursor-pointer" onClick={() => navigate(-1)}>
            <AiOutlineClose />
          </div>
        </div>
        <form onSubmit={createPost}>
          <div className="bg-secondary-bg dark:bg-secondary-darkMode-bg h-auto w-[90%] md:w-[70%] p-4 md:p-8 rounded-lg mx-auto flex flex-col gap-4">
            <ImageUpload onFileSelect={handleFileInput} />
            <textarea
              rows={2}
              placeholder="Enter blog title..."
              className="bg-inherit text-inherit outline-none font-bold text-4xl resize-none w-full title-font py-2"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
            <div className="">
              <ReactQuill
                placeholder="Enter blog content..."
                className="outline-none min-h-[22rem]"
                value={content}
                modules={modules}
                formats={formats}
                onChange={(newContent) => setContent(newContent)}
              />
            </div>
            <select className="border rounded-md px-2 py-2 bg-inherit text-inherit">
              <option>Select Category</option>
              <option value="pending">Photography</option>
              <option value="approved">Technology</option>
              <option value="declined">Lifestyle</option>
            </select>
          </div>
          <div className="flex justify-center items-center pt-4 pb-7 gap-8">
            <button
              // disabled={isSubmitting}
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 py-3 px-6 rounded-md text-white transition duration-300 ease-in-out"
            >
              Publish
            </button>
            <button className="bg-red-500 hover:bg-red-700 py-3 px-6 rounded-md text-white transition duration-300 ease-in-out">
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
