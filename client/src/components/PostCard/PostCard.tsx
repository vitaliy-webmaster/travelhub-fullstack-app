import React, { useCallback } from 'react';
import moment from 'moment';
import { Card, Avatar, Tooltip } from 'antd';
import {
  EditOutlined,
  LikeOutlined,
  LikeFilled,
  DeleteOutlined,
} from '@ant-design/icons';

import './style.css';
import { Post } from '../../types';
import { useHistory } from 'react-router-dom';

const { Meta } = Card;

interface Props {
  post: Post;
  likePost: (id: string) => void;
  unlikePost: (id: string) => void;
  deletePost: (id: string) => void;
  isLikedByMe: boolean | null;
  isMyPost: boolean | null;
}

const PostCard = ({
  post,
  likePost,
  unlikePost,
  deletePost,
  isLikedByMe,
  isMyPost,
}: Props) => {
  const history = useHistory();
  const {
    _id: postId,
    title,
    text,
    author,
    image = '/server/images/post-default.jpg',
    likedBy = [],
    tags = [],
    createdAt,
  } = post;

  const { username, avatar = '/server/images/avatar-default.jpg' } = author;

  const like = useCallback(() => {
    likePost(postId);
  }, [likePost, postId]);

  const unlike = useCallback(() => {
    unlikePost(postId);
  }, [unlikePost, postId]);

  const postDelete = useCallback(() => {
    deletePost(postId);
  }, [deletePost, postId]);

  const postEdit = useCallback(() => {
    history.push(`/post/${postId}`);
  }, [history, postId]);

  const actions = [
    <Tooltip key="post-basic-like" title="Like">
      <span onClick={isLikedByMe ? unlike : like}>
        {React.createElement(isLikedByMe ? LikeFilled : LikeOutlined)}
        <span className="post-action">{likedBy.length}</span>
      </span>
    </Tooltip>,
  ];

  if (isMyPost) {
    actions.push(
      <Tooltip key="post-edit" title="Edit">
        <span onClick={postEdit}>
          <EditOutlined />
        </span>
      </Tooltip>
    );
    actions.push(
      <Tooltip key="post-delete" title="Delete">
        <span onClick={postDelete}>
          <DeleteOutlined />
        </span>
      </Tooltip>
    );
  }

  return (
    <Card
      // title={title}
      className="post-card"
      cover={<img alt="" src={image} />}
      actions={actions}
    >
      <div className="post-card__title">{title}</div>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={`Author: ${username}`}
        description={`Created: ${moment(createdAt).format('YYYY-MM-DD HH:mm')}`}
      />
      <div className="post-card__text">{text}</div>
      <div className="post-card__tags">Tags: {tags.join(' ')}</div>
    </Card>
  );
};

export default PostCard;
