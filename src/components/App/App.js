import React from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import HomePage from '../../pages/HomePage'
import LoginPage from '../../pages/LoginPage'
import RegisterPage from '../../pages/RegisterPage'
import Header from '../Header/Header'
import PostPage from '../../pages/PostPage'
import NewPostPage from '../../pages/NewPostPage'
import PostListPage from '../../pages/PostListPage'
import About from '../../pages/AboutPage'
import EditPostPage from '../../pages/EditPostPage'

const Root = styled.div`
  padding-top: 64px;
`

function App() {

  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/post-list">
            <PostListPage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/new-post">
            <NewPostPage />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/edit-post/:id">
            <EditPostPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  )
}

export default App;
