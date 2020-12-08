import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useHistory, useLocation } from "react-router-dom";
import { setAuthToken } from '../../utils';
import { useSelector, useDispatch } from 'react-redux'
import { getUser, setUser } from '../../redux/reducers/userReducer'

const HeaderContainer = styled.div`
  background: white;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 32px;
`

const Brand = styled(Link)`
  font-size: 28px;
  color: black;
  text-decoration: none;
  font-weight: bold;
`

const NavbarList = styled.div`
  display: flex;
  align-items: center;
  height: 64px;
`

const Nav = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  ${(props) => props.$active && `background: rgba(0, 0, 0, 0.1);`}
`

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  ${NavbarList} {
    margin-left: 64px;
  }
`

export default function Header() {
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(store => store.users.user)

  const handleLogout = () => {
    setAuthToken('')
    dispatch(setUser(null))
    if(location.pathname !== "/") {
      history.push("/")
    }
  }

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <HeaderContainer>
      <LeftContainer>
        <Brand to="/" $active={location.pathname === '/'}>Derek's Blog</Brand>
        <NavbarList>
          
          <Nav to="/post-list" $active={location.pathname === '/post-list'}>文章列表</Nav>
          {user && <Nav to="/new-post" $active={location.pathname === '/new-post'}>發布文章</Nav>}
          <Nav to="/about" $active={location.pathname === '/about'}>關於我</Nav>
        </NavbarList>
      </LeftContainer>
      <NavbarList>
        <Nav to="/register" $active={location.pathname === '/register'}>註冊</Nav>
        {!user && <Nav to="/login" $active={location.pathname === '/login'}>登入</Nav>}
        {user && <Nav onClick={handleLogout}>登出</Nav>}
      </NavbarList>
    </HeaderContainer>
  )
}
