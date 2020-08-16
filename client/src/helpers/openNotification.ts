import { notification } from 'antd';

export enum NotificationType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}
export default (
  type: NotificationType,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
    placement: 'topLeft',
  });
};
