import React, { useEffect} from 'react';
import styled from 'styled-components';
import { useParams, useHistory, Link } from "react-router-dom";
import { getPost, deletePost, setIsDeletePostSuccess } from '../../redux/reducers/postReducer'
import { getUser } from '../../redux/reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const Root = styled.div`
  max-width: 800px;
  margin: 64px auto;
`

const PostContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const PostHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(12, 34, 56, 0.2);
  padding: 20px;
`

const PostTitle = styled.div`
  font-size: 24px;
  color: #333;
  text-decoration: none;
`

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.2);
`

const PostEdit = styled.button``

const PostDelete = styled.button``

const PostBody = styled.div``

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

function Post({post, user, dispatch, history}) {
  return (
    <PostContainer>
      <PostHead>
        <PostTitle>{post.title}</PostTitle>
        <div>
          {user && (user.id === post.userId && 
            <>
              <Link to={`/edit-post/${post.id}`} >
                <PostEdit>編輯</PostEdit>
              </Link>
              <PostDelete onClick={() => {
                dispatch(deletePost(post.id)).then(() => {
                  history.push("/")
                })
              }}>
                刪除
              </PostDelete>
            </>
          )}
          <PostDate>{new Date(post.createdAt).toLocaleString()}</PostDate>
        </div>
      </PostHead>
      <PostBody>{post.body}</PostBody>
    </PostContainer>
  )
}

export default function PostPage() {
  let {id} = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const post = useSelector(store => store.posts.post)
  const user = useSelector(store => store.users.user)
  let isDeletePostSuccess = useSelector(store => store.posts.isDeletePostSuccess)

  useEffect(() => {
    dispatch(getUser())
    dispatch(getPost(id))
    dispatch(setIsDeletePostSuccess(false))
  }, [id, dispatch, isDeletePostSuccess])
  
  return (
    <Root>
      {isLoading && <Loading>Loading...</Loading>}
      {post && post.map((data, id) => (
        <Post key={id} post={data} user={user} dispatch={dispatch} history={history} />
      ))}
    </Root>
  )
}
