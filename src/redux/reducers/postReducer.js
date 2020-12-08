import { createSlice } from '@reduxjs/toolkit';
import { 
  getPost as getPostAPI, 
  newPost as newPostAPI,
  getPosts as getPostsAPI,
  getPostsList as getPostsListAPI,
  deletePost as deletePostAPI,
  updatePost as updatePostAPI,
} from '../../WebAPI'

export const postReducer = createSlice({
  name: 'posts',
  initialState: {
    isLoadingPost: false,
    post: null,
    posts: null,
    postsList: null,
    postNumber: 0,
    isDeletePostSuccess: false,

    newPostResponse: null,
    errorMessage: null,
  },
  reducers: {
    setIsLoadingPost: (state, action) => {
      state.isLoadingPost = action.payload;
    },

    setPost: (state, action) => {
      state.post = action.payload;
    },

    setPosts: (state, action) => {
      state.posts = action.payload;
    },

    setPostsList: (state, action) => {
      state.postsList = action.payload;
    },

    setPostNumber: (state, action) => {
      state.postNumber = action.payload;
    },

    setNewPostResponse: (state, action) => {
      state.newPostResponse = action.payload
    },

    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },

    setIsDeletePostSuccess: (state, action) => {
      state.isDeletePostSuccess = action.payload
    }
  },
});

export const { 
  setIsLoadingPost, 
  setPost, 
  setPosts,
  setPostsList,
  setPostNumber,
  setNewPostResponse, 
  setErrorMessage,
  setIsDeletePostSuccess, 
} = postReducer.actions;

export const getPost = (id) => (dispatch) => {
  dispatch(setIsLoadingPost(true))
  return getPostAPI(id).then((res) => {
    dispatch(setPost(res))
    dispatch(setIsLoadingPost(false))
    return res
  })
};

export const getPosts = () => (dispatch) => {
  dispatch(setIsLoadingPost(true))
  getPostsAPI().then((res) => {
    dispatch(setPosts(res))
    dispatch(setIsLoadingPost(false))
  })
};

export const getPostsList = (postPerPage, page) => (dispatch) => {
  dispatch(setIsLoadingPost(true))
  getPostsListAPI(postPerPage, page).then((res) => {
    dispatch(setPostNumber(res.headers.get('x-total-count')))
    return res.json()
  }).then(data => {
    dispatch(setPostsList(data))
    dispatch(setIsLoadingPost(false))
  })
};

export const newPost = (title, body, userId) => (dispatch) => {
  if(!userId) return
  return newPostAPI(title, body).then((res) => {
    if(res.ok === 0) {
      dispatch(setErrorMessage(res.message.toString()))
    } 
    dispatch(setNewPostResponse(res))
    return res
  })
}

export const deletePost = (postId) => (dispatch) => {
  return deletePostAPI(postId).then(() => {
    dispatch(setIsDeletePostSuccess(true))
  })
}

export const updatePost = (title, body, postId, userId) => (dispatch) => {
  if(!userId) return
  return updatePostAPI(title, body, postId).then((res) => {
    if(res.ok === 0) {
      dispatch(setErrorMessage(res.message.toString()))
    } 
    dispatch(setNewPostResponse(res))
    return res
  })
}

export default postReducer.reducer;
