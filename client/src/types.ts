export interface User {
  _id: string;
  username: string;
  email: string;
  birthday?: string;
  gender?: string;
  bio?: string;
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  image?: string;
  author: User;
  likedBy: User[];
  tags: string[];
  createdAt?: string;
  updatedAt?: string;
}
