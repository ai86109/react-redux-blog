import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { newPost, setErrorMessage } from '../../redux/reducers/postReducer'
import { getUser } from '../../redux/reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";

const FormContainer = styled.div`
  margin: 100px auto;
  width: 550px;
`

const FormBlock = styled.form`
  width: 450px;
  height: 400px;
  padding: 60px;
  border: solid 1px #000000;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FormTitle = styled.h1`
  font-size: 36px;
  text-align: center;
`

const FormItem = styled.div`
  display: flex;
  
`

const FormInput = styled.input`
  border: solid 1px #d0d0d0;
  width: 287px;
  height: 23px;
  margin: 10px 20px;
`;

const FormTextArea = styled.textarea`
  border: solid 1px #d0d0d0;
  margin: 10px 20px;
`

const SubmitButton = styled.button`
  width: 92px;
  height: 40px;
  border-radius: 3px;
  background-color: black;
  color: white;
  font-size: 15px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: red;
`

export default function NewPostPage() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMessage = useSelector(store => store.posts.errorMessage)
  const userId = useSelector(store => store.users.user)

  const handleSubmit = () => {
    dispatch(setErrorMessage(null))
    dispatch(newPost(
      title,
      body,
      userId,
    )).then((newPostResponse) => {
      if(newPostResponse && newPostResponse.id) {
        history.push("/post/" + newPostResponse.id)
      }
    })
  }

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      if(res.ok !== 1) {
        history.push("/")
      }
    })
  }, [dispatch, history])

  return (
    <FormContainer>
      <FormBlock onSubmit={handleSubmit}>
        <FormTitle>新增文章</FormTitle>
        <div>
          Title:
          <FormInput value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <FormItem>
          Content:
          <FormTextArea cols="33" rows="12" value={body} onChange={(e) => setBody(e.target.value)} />
        </FormItem>
        <SubmitButton>發布</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormBlock>
    </FormContainer>
  )
}