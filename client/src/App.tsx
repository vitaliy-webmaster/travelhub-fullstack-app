import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import { store } from './redux/store';
import Header from './components/Header';
import Footer from './components/Footer';
import Starter from './pages/Starter';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout className="app-layout">
          <Header />
          <Layout.Content className="app-content">
            <Route exact path="/">
              <Starter />
            </Route>
            <Route path="/signup">{/*<Signup />*/}</Route>
            <Route path="/login">{/*<Login />*/}</Route>
            <Route path="/feed">{/*<Feed />*/}</Route>
            <Route path="/post/:postId">{/*<Feed />*/}</Route>
            <Route exact path="/user/:userId">
              {/*<Feed />*/}
            </Route>
            <Route path="/user/:userId/feed">{/*<Feed />*/}</Route>
          </Layout.Content>
          <Footer />
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
