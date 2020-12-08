import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuthToken } from '../../utils';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { getUser, setErrorMessage, login } from '../../redux/reducers/userReducer';

const FormContainer = styled.div`
  margin: 100px auto;
  width: 550px;
}
`

const FormBlock = styled.form`
  width: 450px;
  height: 300px;
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

const FormInput = styled.input`
  border: solid 1px #d0d0d0;
  width: 287px;
  height: 23px;
  margin: 10px 20px;
`;

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

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const dispatch = useDispatch()
  const errorMessage = useSelector(store => store.users.errorMessage)

  const handleSubmit = () => {
    dispatch(setErrorMessage(null))
    dispatch(login(username, password)).then(() => {
      if(getAuthToken()) {
        dispatch(getUser()).then((res) => {
          if(res.ok === 1) return history.push("/")
        })
      }
    })
  }
  return (
    <FormContainer>
      <FormBlock onSubmit={handleSubmit}>
        <FormTitle>登入</FormTitle>
        <div>
          Username:
          <FormInput value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          Password:
          <FormInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <SubmitButton>登入</SubmitButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </FormBlock>
    </FormContainer>
  )
}