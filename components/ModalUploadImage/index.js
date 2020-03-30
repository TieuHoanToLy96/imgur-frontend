import { Modal, Icon, Upload, Divider, Input } from "antd"
import { useState } from "react"

import { getHostName } from "/utils/tools"
import { sendPost } from "/utils/request"

const action = `${getHostName()}/api/v1/files/upload`

const ModalUploadImage = props => {
  const { handleCloseModal, uploadImage } = props

  const handleUploadImage = info => {
    console.log(info)
    if (info.file.status == "done" && info.file.response.data.path) {
      uploadImage(info.file.response.data.path)
    }
  }

  const handleUploadImageUrl = e => {
    let value = e.target.value

    sendPost(action, { url: value }).then(res => {
      uploadImage(res.data.data.path)
    })
  }

  return (
    <Modal closable={false} visible={true} className="modal-upload" footer={null} closeIcon={<Icon type="step-backward" />}>
      <div className="modal-upload--drag is-flex is-flex--center is-relative">
        <div className="modal-upload--close" onClick={handleCloseModal}>
          <img src="https://statics.pancake.vn/web-media/5c/cb/01/8a/99e74ab57a87934ae755b3dc2d67b8f09f38a23f9f3eb305e2f48f0e.svg" />
        </div>
        <div className="modal-upload--drag__image">
          <img src="https://statics.pancake.vn/web-media/8c/13/1f/2d/2c0380c3ed7dad3b2d8115be610cb8c3467334321f49b8c5a02a4c4f.png" />
        </div>
        <Upload.Dragger showUploadList={false} action={action} onChange={handleUploadImage}>
          Drop image here
        </Upload.Dragger>
      </div>

      <div className="modal-upload--select">
        <Upload action={action} showUploadList={false} onChange={handleUploadImage}>
          <div className="is-flex modal-upload--choose is-flex is-flex--center">
            <img className="mr-10" src="https://statics.pancake.vn/web-media/ad/ac/97/07/545c38901ac23aba44874431ead90ac6bdcd656af4a30532a1a1c231.svg" />
            Choose Photo/Video
            </div>
        </Upload>
        <div className="modal-upload--divider">
          <Divider>or</Divider>
        </div>

        <div className="modal-upload--url is-flex is-flex--center">
          <Input placeholder="Paste url" onPressEnter={handleUploadImageUrl} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalUploadImage