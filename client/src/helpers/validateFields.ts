import moment from 'moment';

const usernameRegexp = /^[0-9a-zA-Z]{3,}$/;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$%^&*-]).{6,20}$/;

export const validateDate = (value: any) => {
  let errors;

  if (!value) {
    errors = 'Date is required';
  } else if (
    moment(value).format('DD-MM-YYYY') < moment(Date.now()).format('DD-MM-YYYY')
  ) {
    errors = 'Invalid date';
  }

  return errors;
};

export const validateEmail = (value: any) => {
  let errors;

  if (!value) {
    errors = 'Email is required';
  } else if (!emailRegex.test(value)) {
    errors = 'Invalid email';
  }

  return errors;
};

export const validatePassword = (value: string) => {
  let errors;

  if (!value) {
    errors = 'Password is required';
  } else if (!passwordRegex.test(value)) {
    errors = 'Invalid password';
  }

  return errors;
};

export const isRequired = (value: any) => (!value ? 'Field is required' : '');
