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
    image = '/server/img/no-post-preview.png',
    likedBy = [],
    tags = [],
    createdAt,
  } = post;

  const { username, avatar = '/server/img/no-author-avatar.png' } = author;

  const like = useCallback(() => {
    likePost(postId);
  }, [likePost]);

  const unlike = useCallback(() => {
    unlikePost(postId);
  }, [unlikePost]);

  const postDelete = useCallback(() => {
    deletePost(postId);
  }, [deletePost]);

  const postEdit = useCallback(() => {
    history.push(`/post/${postId}`);
  }, [history]);

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
      title={title}
      className="post-card"
      cover={
        <img alt="Post Image Preview" src={'/server/img/no-post-preview.png'} />
      }
      actions={actions}
    >
      <Meta
        avatar={<Avatar src={avatar} />}
        title={`Author: ${username}`}
        description={`Created: ${moment(createdAt).format('DD-MM-YYYY')}`}
      />
      <div className="post-card__text">{text}</div>
    </Card>
  );
};

export default PostCard;
