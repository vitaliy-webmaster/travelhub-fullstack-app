import moment from 'moment';

const usernameRegex = /^[0-9a-zA-Z]{3,}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,20}$/;

export const validateUsername = (type: 'signup' | 'profile') => async (
  value: any
) => {
  if (!value) return 'Username is required';
  if (!usernameRegex.test(value)) return 'Invalid username';
  if (type === 'signup') {
    const response = await fetch(`/api/v1/auth/username-check/${value}`);
    if (response.ok) return;
    return 'Username already exists';
  }
};

export const validateEmail = (value: any) => {
  if (!value) return 'Email is required';
  if (!emailRegex.test(value)) return 'Invalid email';
};

export const validatePassword = (value: string) => {
  if (!value) return 'Password is required';
  if (!passwordRegex.test(value))
    return '6-20 chars, one uppercase, one special';
};

export const validateDate = (value: any) => {
  if (!value) return;
  if (moment(value) > moment().subtract(18, 'years')) {
    return 'You must be at least 18 years old';
  }
};

export const validateGender = (value: any) => {
  if (!['male', 'female'].includes(value)) return 'Gender is required';
};

export const validateBio = (value: any) => {
  if (!value) return;
  if (value.length > 100) return 'Max 100 symbols allowed';
};

export const validatePostTitle = (value: any) => {
  if (!value) return 'Title is required';
  if (value.length > 100) return 'Max 100 symbols allowed';
};

export const validatePostText = (value: any) => {
  if (!value) return 'Text is required';
  if (value.length > 5000) return 'Max 5000 symbols allowed';
};

export const isRequired = (value: any) => (!value ? 'Field is required' : '');
