import { notification, Icon } from "antd"

export default {
  success: (message, description) => {
    notification.success({
      message,
      description,
      className: "noti-success",
      placement: "bottomRight",
      icon: <Icon type="check-circle" theme="filled" />
    })
  },

  error: (message, description) =>  {
    notification.error({
      message,
      description,
      className: "noti-error",
      placement: "bottomRight",
      icon: <Icon type="close-circle" theme="filled" />
    })
  },

  warning: (message, description) => {
    notification.warning({
      message,
      description,
      className: "noti-warning",
      placement: "bottomRight",
      icon: <Icon type="warning" theme="filled" />
    })
  },

  info: (message, description) => {
    notification.info({
      // className: 'ant-notification-warning',
      message,
      description,
      className: "noti-info",
      placement: "bottomRight",
      icon: <Icon type="info-circle" theme="filled" />
    })
  },

  errorStrict: (err, message, description) => {
    console.log(err)
    console.log(err.response)
    notification.error({
      message: err && err.response && err.response.data && err.response.data.message ? err.response.data.message : message,
      description: err && err.response && err.response.data && err.response.data.reason ? err.response.data.reason : description,
      className: "noti-error",
      placement: "bottomRight",
      icon: <Icon type="close-circle" theme="filled" />
    })
  },

  errorNonStrict: (res, message, description) => {
    console.log(res)
    console.log(res.response)
    notification.error({
      message: res && res.data && res.data.message ? res.data.message : message,
      description: res && res.data && res.data.reason ? res.data.reason : description,
      className: "noti-error",
      placement: "bottomRight",
      icon: <Icon type="close-circle" theme="filled" />
    })
  }
}
