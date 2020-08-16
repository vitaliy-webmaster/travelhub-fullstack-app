import React, { Dispatch, SetStateAction, useState } from 'react';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import './style.css';
import openNotification, {
  NotificationType,
} from '../../helpers/openNotification';

const beforeUpload = (file: any) => {
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
  const isAllowedSize = file.size / 1024 / 1024 < 5;
  if (!isAllowedSize) {
    openNotification(
      NotificationType.ERROR,
      'Oh no, Failure',
      'Post image must be smaller than 5MB!'
    );
  }
  return isJpgOrPng && isAllowedSize;
};

interface Props {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
}

const UploadPostImage = ({ imageUrl, setImageUrl }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setImageUrl(
        `/server/uploads/post-preview/${info.file.response.filename}`
      );
      setIsLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Post Preview</div>
    </div>
  );

  return (
    <Upload
      name="post-preview"
      listType="picture-card"
      className="post-image-uploader"
      showUploadList={false}
      action="/api/v1/posts/upload-post-preview"
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

export default UploadPostImage;
