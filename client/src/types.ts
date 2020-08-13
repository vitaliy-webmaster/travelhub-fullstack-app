export interface User {
  _id: string;
  username: string;
  email: string;
  birthday?: Date;
  gender?: string;
  bio?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  image?: string;
  author: string;
  likedBy: Array<string | User>;
  tags: Array<string>;
  createdAt?: Date;
  updatedAt?: Date;
}
