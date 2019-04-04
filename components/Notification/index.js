import { notification } from 'antd';

export default {
  success: (message, description) => {
    notification.success({
      message,
      description
    })
  },

  error: (message, description) => {
    notification.error({
      message,
      description
    })
  },

  warning: (message, description) => {
    notification.warning({
      message,
      description
    })
  },

  info: (message, description) => {
    notification.info({
      // className: 'ant-notification-warning',
      message,
      description
    })
  },

  errorStrict: (err, message, description) => {
    console.log(err)
    console.log(err.response)
    notification.error({
      message: err && err.response && err.response.data && err.response.data.message ? err.response.data.message : message,
      description: err && err.response && err.response.data && err.response.data.reason ? err.response.data.reason : description
    })
  },

  errorNonStrict: (res, message, description) => {
    console.log(res)
    console.log(res.response)
    notification.error({
      message: res && res.data && res.data.message ? res.data.message : message,
      description: res && res.data && res.data.reason ? res.data.reason : description
    })
  }
}