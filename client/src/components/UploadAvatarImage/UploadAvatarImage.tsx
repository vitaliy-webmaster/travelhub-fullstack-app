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
  const isAllowedSize = file.size / 1024 / 1024 < 2;
  if (!isAllowedSize) {
    openNotification(
      NotificationType.ERROR,
      'Oh no, Failure',
      'Avatar image must be smaller than 2MB!'
    );
  }
  return isJpgOrPng && isAllowedSize;
};

interface Props {
  imageUrl: string | null;
  setImageUrl: Dispatch<SetStateAction<string | null>>;
}

const UploadAvatarImage = ({ imageUrl, setImageUrl }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setIsLoading(true);
      return;
    }

    if (info.file.status === 'done') {
      setImageUrl(`/server/uploads/avatar/${info.file.response.filename}`);
      setIsLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="/api/v1/users/upload-avatar"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadAvatarImage;
