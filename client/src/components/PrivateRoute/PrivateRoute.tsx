import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router';
import { useSelector } from 'react-redux';
import { authUserSelector } from '../../redux/selectors';
import { User } from '../../types';

interface PrivateRouteProps extends RouteProps {
  children?: React.ReactNode;
  authRequired?: boolean;
  deniedOnAuth?: boolean;
  redirectPath?: string;
  authUser: User | null;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const { authRequired, deniedOnAuth, redirectPath = '/', authUser } = props;
  console.log('authUser', authUser);
  console.log('authRequired', authRequired);
  if ((!authUser && authRequired) || (authUser && deniedOnAuth))
    return <Redirect to={{ pathname: redirectPath }} />;
  return (
    <Route
      {...props}
      component={props.component}
      render={undefined}
      children={props.children}
    />
  );
};

export default PrivateRoute;
