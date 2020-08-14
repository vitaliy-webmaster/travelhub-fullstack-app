import moment from 'moment';

const usernameRegex = /^[0-9a-zA-Z]{3,}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,20}$/;

export const validateUsername = (value: any) => {
  if (!value) return 'Username is required';
  if (!usernameRegex.test(value)) return 'Invalid username';
};

export const validateEmail = (value: any) => {
  if (!value) return 'Email is required';
  if (!emailRegex.test(value)) return 'Invalid email';
};

export const validatePassword = (value: string) => {
  if (!value) return 'Password is required';
  if (!passwordRegex.test(value)) return 'Invalid password';
};

export const validateDate = (value: any) => {
  if (!value) return;
  if (moment(value) > moment().subtract(18, 'years')) {
    return 'You must be at least 18 years old';
  }
};

export const validateBio = (value: any) => {
  if (!value) return;
  if (value.length > 100) return 'Max 100 symbols allowed';
};

export const validatePostTitle = (value: any) => {
  if (!value) return;
  if (value.length > 100) return 'Max 100 symbols allowed';
};

export const validatePostText = (value: any) => {
  if (!value) return;
  if (value.length > 5000) return 'Max 5000 symbols allowed';
};

export const isRequired = (value: any) => (!value ? 'Field is required' : '');
