import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import openNotification, {
  NotificationType,
} from '../../helpers/openNotification';
import { RcFile } from 'antd/lib/upload';

interface Props {
  type: 'avatar' | 'post';
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
}

const UploadImage = ({ type, imageUrl, setImageUrl }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const beforeUpload = useCallback(
    (file: RcFile): boolean | PromiseLike<void> => {
      const isJpgOrPng =
        file.type === 'image/jpg' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/png';
      if (!isJpgOrPng) {
        openNotification(
          NotificationType.ERROR,
          'Oh no, Failure',
          'You can only upload JPG/JPEG/PNG file'
        );
      }
      let isAllowedSize = false;
      if (type === 'avatar') isAllowedSize = file.size / 1024 / 1024 < 2;
      if (type === 'post') isAllowedSize = file.size / 1024 / 1024 < 5;

      if (!isAllowedSize) {
        openNotification(
          NotificationType.ERROR,
          'Oh no, Failure',
          `Avatar image must be smaller than ${type === 'avatar' ? 2 : 5}MB!`
        );
      }
      return isJpgOrPng && isAllowedSize;
    },
    [type]
  );

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setImageUrl(
        `/server/uploads/${type === 'avatar' ? 'avatar' : 'post-preview'}/${
          info.file.response.filename
        }`
      );
      setIsLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">
        {type === 'avatar' ? 'Avatar' : 'Post'} Preview
      </div>
    </div>
  );

  return (
    <Upload
      name={type === 'avatar' ? 'avatar' : 'post-preview'}
      listType="picture-card"
      className={`${type === 'avatar' ? 'avatar' : 'post-image'}-uploader`}
      showUploadList={false}
      action={
        type === 'avatar'
          ? '/api/v1/users/upload-avatar'
          : '/api/v1/posts/upload-post-preview'
      }
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
