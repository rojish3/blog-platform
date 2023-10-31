import { ChangeEvent, useState, FormEvent } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

const CreatePost = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const cookies = new Cookies();
  const token = cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const file = event.target.files && event.target.files[0];

    if (file) {
      // Check if the uploaded file is an image
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverImage(file);
          setImagePreview(e.target?.result as string);
          setLoading(false);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle the case when the uploaded file is not an image
        setLoading(false);
        alert("Please upload an image file.");
      }
    }
  };

  const resetPost = () => {
    setImagePreview(null);
    setCoverImage(null);
    setTitle("");
    setContent("");
    setCategory("");
  };

  const createPost = async (e: FormEvent) => {
    e.preventDefault();
    // Validate the form data
    if (!coverImage || !title || !content || !category) {
      alert("Please fill in all the required fields.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("category", category);
      formData.append("image", coverImage);
      console.log(formData);
      const postData: AxiosResponse = await axios.post(
        "http://localhost:3000/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (postData.status === 201) {
        toast.success(postData.data.message);
        // resetPost();
        setTimeout(() => {
          navigate("/blogs");
        }, 500);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error(error.response.data.message);
      }
    }
  };

  // Text editor module and formats
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
          <div className="bg-secondary-bg dark:bg-secondary-darkMode-bg text-inherit h-auto w-[90%] md:w-[70%] p-4 md:p-8 rounded-lg mx-auto flex flex-col gap-4">
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                name="image"
                id="fileInput"
              />
              <label
                htmlFor="fileInput"
                className={`${
                  loading
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                } p-2 rounded-md text-white transition duration-300 ease-in-out`}
              >
                {loading ? "Uploading..." : "Add a cover image"}
              </label>
              {imagePreview && (
                <div className="mt-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-64"
                  />
                </div>
              )}
            </div>
            <textarea
              rows={2}
              placeholder="Enter blog title..."
              className="bg-inherit text-inherit outline-none font-bold text-4xl resize-none w-full title-font py-2"
              onChange={(e) => setTitle(e.target.value.trim())}
            ></textarea>
            <div className="">
              <ReactQuill
                placeholder="Enter blog content..."
                className="outline-none min-h-[22rem]"
                value={content}
                modules={modules}
                formats={formats}
                onChange={(newContent) => setContent(newContent.trim())}
              />
            </div>
            <select
              className="border rounded-md px-2 py-2 bg-inherit text-inherit"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Artificial Intelligence">
                Artificial Intelligence
              </option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Programming">Programming</option>
              <option value="Technology">Technology</option>
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
            <button
              type="reset"
              className="bg-red-500 hover:bg-red-700 py-3 px-6 rounded-md text-white transition duration-300 ease-in-out"
              onClick={resetPost}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
