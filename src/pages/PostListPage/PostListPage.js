import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { getPostsList, deletePost, setIsDeletePostSuccess } from '../../redux/reducers/postReducer'
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

const PostEdit = styled.button``

const PostDelete = styled.button``

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.2);
`

const PageBlock = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`

const Home = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: "<<";
  }
`

const PageUp = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: "<";
  }
`

const PageDown = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: ">";
  }
`

const End = styled.div`
  cursor: pointer;
  margin: 0 5px;
  &:before {
    content: ">>";
  }
`

const PageNumber = styled.div``

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

function Page({page, setPage, totalPages}) {

  function changePage(target) {
    if(target === 'home') {
      setPage(1)
    } else if(target === 'end') {
      setPage(totalPages)
    } else if(target === 'pageup' && page > 1) {
      setPage(page - 1)
    } else if(target === 'pagedown' && page < totalPages) {
      setPage(page + 1)
    }
  }

  return (
    <PageBlock>
      <Home onClick={() => changePage('home', page, setPage, totalPages)} />
      <PageUp onClick={() => changePage('pageup', page, setPage, totalPages)} />
      <PageNumber>{page} / {totalPages}</PageNumber>
      <PageDown onClick={() => changePage('pagedown', page, setPage, totalPages)} />
      <End onClick={() => changePage('end', page, setPage, totalPages)} />
    </PageBlock>
  )
}

export default function PostListPage() {
  const [page, setPage] = useState(1)
  const dispatch = useDispatch()
  const isLoading = useSelector(store => store.posts.isLoadingPost)
  const postNumber = useSelector(store => store.posts.postNumber)
  const postsList = useSelector(store => store.posts.postsList)
  const user = useSelector(store => store.users.user)
  let isDeletePostSuccess = useSelector(store => store.posts.isDeletePostSuccess)
  const postPerPage = 5
  let totalPages = Math.ceil( postNumber / postPerPage )

  useEffect(() => {
    dispatch(getPostsList(postPerPage, page))
    dispatch(setIsDeletePostSuccess(false))
    //getUser 抓出 res.data.id 用來篩編輯＆刪除
  }, [page, dispatch, isDeletePostSuccess])

  return (
    <Root>
      {isLoading && <Loading>Loading...</Loading>}
      {postsList && postsList.map((post) => (
        <Post key={post.id} post={post} user={user} dispatch={dispatch} />
      ))}
      {!isLoading && <Page page={page} setPage={setPage} totalPages={totalPages} />}
    </Root>
  )
}