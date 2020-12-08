import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { getPosts, deletePost, setIsDeletePostSuccess } from '../../redux/reducers/postReducer'
import { useSelector, useDispatch } from 'react-redux'

const Root = styled.div`
  max-width: 800px;
  margin: 0 auto;
`

const PostContainer = styled.div`
  border-bottom: 1px solid rgba(12, 34, 56, 0.2);
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

const PostTitle = styled(Link)`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.2);
`

const PostEdit = styled.button``

const PostDelete = styled.button``

const Loading = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  top: 64px;
  left: 50%;
  right: 50%;
  font-size: 24px;
  background: black;
  color: white;
  width: 120px;
`

function Post({post, user, dispatch}) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <div>
        {user && (user.id === post.userId && 
          <>
            <Link to={`/edit-post/${post.id}`} >
              <PostEdit>編輯</PostEdit>
            </Link>
            <PostDelete onClick={() => {
              dispatch(deletePost(post.id))
            }}>
              刪除
            </PostDelete>
          </>
        )}
        <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
      </div>
    </PostContainer>
  )
}

export default function HomePage() {
  const dispatch = useDispatch()
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const posts = useSelector(store => store.posts.posts)
  const user = useSelector(store => store.users.user)
  let isDeletePostSuccess = useSelector(store => store.posts.isDeletePostSuccess)

  useEffect(() => {
    dispatch(getPosts())
    dispatch(setIsDeletePostSuccess(false))
  }, [dispatch, isDeletePostSuccess])

  return (
    <Root>
      {isLoading && <Loading>Loading...</Loading>}
      {posts && posts.map((post) => (
        <Post key={post.id} post={post} user={user} dispatch={dispatch} />
      ))}
    </Root>
  )
}