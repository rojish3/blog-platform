import { ChangeEvent, useState, FormEvent, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";

interface PostData {
  image: string;
  title: string;
  content: string;
  category: string;
  userId: string;
  views: number;
  createdAt: string;
}

const EditPost = () => {
  const [postData, setPostData] = useState<PostData>({
    image: "",
    title: "",
    content: "",
    category: "",
    userId: "",
    views: 0,
    createdAt: "",
  });
  const [coverImage, setCoverImage] = useState<File | null | string>(null);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dataFetched, setDataFetched] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
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
          setImagePreview((e.target?.result as string) || postData.image);
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

  useEffect(() => {
    const getPost = async () => {
      try {
        const post = await axios.get<PostData>(
          `http://localhost:3000/api/posts/${id}`
        );
        console.log(post.data);
        setPostData(post.data);
        setTitle(post.data.title);
        setContent(post.data.content);
        setCategory(post.data.category);
        setCoverImage(post.data.image);
        const postImage = `http://localhost:3000/api/images/${post.data.image}`;
        setImagePreview(postImage);

        // Set the dataFetched state to true after fetching the data
        setDataFetched(true);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

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
      const postData: AxiosResponse = await axios.patch(
        `http://localhost:3000/api/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (postData.status === 200) {
        toast.success(postData.data.message);
        resetPost();
        navigate("/blogs");
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

  if (!dataFetched) {
    return (
      <div className="flex space-x-2 justify-center items-center bg-primary-bg h-screen dark:invert">
        <span className="sr-only">Loading...</span>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
    );
  }

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
            <div>
              <input
                // defaultValue={`http://localhost:3000/api/images/${postData.image}`}
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
              value={title}
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
                onChange={(newContent) => setContent(newContent.trim())}
              />
            </div>
            <select
              className="border rounded-md px-2 py-2 bg-inherit text-inherit"
              value={category}
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

export default EditPost;
