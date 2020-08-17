import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import './style.css';
import LogInForm from '../../components/LogInForm';
import { User } from '../../types';
import { Button } from 'antd';

interface Props {
  authUser: User | null;
}

const Starter = ({ authUser }: Props) => {
  const history = useHistory();

  const navigate = useCallback(
    (url: string) => () => {
      history.push(url);
    },
    [history]
  );

  return (
    <div className="page-starter">
      <div className="page-starter__greeting greeting">
        <h1 className="greeting__header">Built for travellers</h1>
        <p className="greeting__text">
          TravelHUB is a travel platform inspired by the way you live and
          create. From Kiev to New York, you can share your lifestyle, open up
          new adventures, and build your audience everywhere you want.
        </p>
      </div>
      {authUser ? (
        <div className="page-starter__get-access-container get-access-container">
          <div className="get-access-container__header">
            Already logged in. <br /> Get access now?
          </div>
          <Button
            className="app-header__button"
            onClick={navigate('/feed')}
            size="middle"
            type="primary"
          >
            Proceed
          </Button>
        </div>
      ) : (
        <div className="page-starter__login-container login-container">
          <LogInForm />
        </div>
      )}
    </div>
  );
};

export default Starter;
