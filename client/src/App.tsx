import React, { useEffect } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { Layout } from 'antd';

import Header from './components/Header';
import Footer from './components/Footer';
import LoadSpinner from './components/LoadSpinner';
import Starter from './pages/Starter';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Feed from './pages/Feed';
import PrivateRoute from './components/PrivateRoute';
import { authUserSelector, isRefetchAuthDoneSelector } from './redux/selectors';
import { refetchAuthStart } from './redux/thunks';
import User from './pages/User';
import Post from './pages/Post';
import NewPost from './pages/NewPost';
import {
  setSocketConnect,
  wsCreatePost,
  wsDeletePost,
  wsUpdatePost,
} from './redux/actions';
import { Post as PostType } from './types';

const App = () => {
  const authUser = useSelector(authUserSelector);
  const isRefetchAuthDone = useSelector(isRefetchAuthDoneSelector);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const socket = io.connect('/');
    dispatch(setSocketConnect(socket));
    socket.on('create_post', (post: PostType) => {
      dispatch(wsCreatePost(post));
    });
    socket.on('update_post', (post: PostType) => {
      dispatch(wsUpdatePost(post));
    });
    socket.on('delete_post', (id: string) => {
      dispatch(wsDeletePost(id));
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(refetchAuthStart());
  }, [dispatch]);

  const appContent = (
    <>
      <Switch>
        <Route exact path="/">
          <Starter authUser={authUser} />
        </Route>
        <PrivateRoute
          deniedOnAuth
          exact
          redirectPath="/feed"
          authUser={authUser}
          path="/signup"
        >
          <SignUp />
        </PrivateRoute>
        <PrivateRoute
          deniedOnAuth
          exact
          redirectPath="/feed"
          authUser={authUser}
          path="/login"
        >
          <LogIn />
        </PrivateRoute>
        <Route exact path="/feed">
          <Feed />
        </Route>
        <PrivateRoute
          authRequired
          redirectPath="/"
          authUser={authUser}
          exact
          path="/post/new"
        >
          <NewPost />
        </PrivateRoute>
        <PrivateRoute
          authRequired
          redirectPath="/"
          authUser={authUser}
          exact
          path="/post/:postId"
        >
          <Post />
        </PrivateRoute>
        <PrivateRoute
          authRequired
          redirectPath="/"
          authUser={authUser}
          exact
          path="/me"
        >
          <User />
        </PrivateRoute>
      </Switch>
    </>
  );

  const bgClass =
    location.pathname === '/' ||
    location.pathname === '/login' ||
    location.pathname === '/signup'
      ? 'app-content--bg'
      : '';

  return (
    <Layout className="app-layout">
      <Header />
      <Layout.Content className={`app-content ${bgClass}`}>
        {isRefetchAuthDone ? appContent : <LoadSpinner />}
      </Layout.Content>
      <Footer />
    </Layout>
  );
};

export default App;
