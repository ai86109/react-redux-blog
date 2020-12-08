import { createSlice } from '@reduxjs/toolkit';
import { 
  getMe, 
  login as loginAPI,
  register as registerAPI
} from '../../WebAPI'
import { setAuthToken } from '../../utils'

export const userReducer = createSlice({
  name: 'users',
  initialState: {
    user: null,
    errorMessage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload
    },
  },
});

export const { setUser, setErrorMessage } = userReducer.actions;

export const register = (nickname, username, password) => (dispatch) => {
  return registerAPI(nickname, username, password).then((data) => {
    if(data.ok === 0) {
      return dispatch(setErrorMessage(data.message))
    }
    setAuthToken(data.token)
  })
}

export const login = (username, password) => (dispatch) => {
  return loginAPI(username, password).then((data) => {
    if(data.ok === 0) {
      return dispatch(setErrorMessage(data.message))
    }
    setAuthToken(data.token)
  })
}

export const getUser = () => (dispatch) => {
  return getMe().then((response) => {
    if(response.ok === 1) {
      dispatch(setUser(response.data))
      return response
    } else {
      setAuthToken(null)
      dispatch(setErrorMessage(response.toString()))
      return response
    }
  })
};

export default userReducer.reducer;
