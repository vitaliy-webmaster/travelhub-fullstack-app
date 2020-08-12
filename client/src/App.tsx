import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { firstActionCreator } from './redux/actions';

const App = () => {
  useEffect(() => {
    store.dispatch(firstActionCreator({}));
  }, []);

  return (
    <Provider store={store}>
      <div className="App">TEST TEXT!</div>
    </Provider>
  );
};

export default App;
