import React, { useState } from 'react';
import './style.css';
import { useDispatch } from 'react-redux';
import { signUpStart } from '../../redux/thunks';
import { Formik } from 'formik';
import InnerForm from './InnerForm';
import UploadAvatarImage from '../UploadAvatarImage';

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
  birthday?: Date;
  gender?: string;
  bio?: string;
}

const initialValues: Partial<SignUpFormValues> = {
  username: undefined,
  email: undefined,
  password: undefined,
  birthday: undefined,
  gender: undefined,
  bio: undefined,
};

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = (values: SignUpFormValues) => {
    dispatch(signUpStart({ ...values, avatar: imageUrl }));
  };

  return (
    <div className="signup-form-wrapper">
      <UploadAvatarImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
      <Formik
        initialValues={initialValues as SignUpFormValues}
        onSubmit={handleSubmit}
      >
        {InnerForm}
      </Formik>
    </div>
  );
};

export default SignUpForm;
