// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";

// interface Post {
//   _id: string;
//   image: string;
//   title: string;
//   category: string;
//   content: string;
//   userId: string;
//   userName: string;
//   createdAt: Date;
//   updatedAt: Date;
// }

// interface PostsState {
//   posts: Post[];
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: PostsState = {
//   posts: [],
//   status: "idle",
//   error: null,
// };

// export const fetchPosts = createAsyncThunk<Post[]>(
//   "posts/fetchPosts",
//   async () => {
//     const response = await axios.get("http://localhost:3000/api/posts");
//     return response.data;
//   }
// );

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     setPost: (state, action) => {
//       return action.payload;
//     },
//     addPost: (state, action: PayloadAction<Post>) => {
//       state.posts.push(action.payload);
//     },
//     updatePost: (state, action: PayloadAction<Post>) => {
//       const { _id, title, body } = action.payload;
//       const post = state.posts.find((post) => post._id === _id);
//       if (post) {
//         post.title = title;
//         post.content = body;
//       }
//     },
//     deletePost: (state, action: PayloadAction<string>) => {
//       const id = action.payload;
//       state.posts = state.posts.filter((post) => post._id !== id);
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPosts.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.posts = action.payload;
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { setPost, addPost, updatePost, deletePost } = postsSlice.actions;

// export default postsSlice.reducer;
