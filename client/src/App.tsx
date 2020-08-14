import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Spin } from 'antd';

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

const App = () => {
  const authUser = useSelector(authUserSelector);
  const isRefetchAuthDone = useSelector(isRefetchAuthDoneSelector);
  const dispatch = useDispatch();

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

  return (
    <Router>
      <Layout className="app-layout">
        <Header />
        <Layout.Content className="app-content">
          {isRefetchAuthDone ? appContent : <LoadSpinner />}
        </Layout.Content>
        <Footer />
      </Layout>
    </Router>
  );
};

export default App;
