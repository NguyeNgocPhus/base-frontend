import { notification } from "antd";

export const NotificationInfo = () => {};

export const NotificationSuccess = () => {};

export const NotificationError = (title = "", message = "") => {
  notification.info({
    message: title,
    description: message,
    placement: "topRight",
    duration: 5,
  });
};
