import { User } from '../types';

interface APIData {
  users: {
    logIn: (email: string, password: string) => Promise<User>;
    logOut: () => Promise<string>;
  };
  posts: {
    fetch: () => Promise<{}>;
  };
}

const API: APIData = {
  users: {
    logIn: async (email, password) => {
      const response = await fetch(`/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Invalid Login Attempt');
      }
    },
    logOut: async () => {
      const response = await fetch(`/api/v1/auth/logout`);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error('Invalid Logout Attempt');
      }
    },
  },
  posts: {
    fetch: (): Promise<{}> =>
      fetch(`/api/v1/posts`, {
        method: 'GET',
      })
        .then((response) => response.json())
        .then(({ results }) => ({ results })),
  },
};

export default API;
