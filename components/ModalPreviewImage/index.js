import { Modal, Button } from "antd"
import { useState } from "react"

const ModalPreviewImage = props => {
  const { indexPreview, imagesPreview, closeModal } = props
  const [index, setIndex] = useState(indexPreview)
  const [imagePreview, setImagePreview] = useState(imagesPreview[indexPreview])

  const handleChangePreview = move => e => {
    e.stopPropagation()
    let newPreviewImg = imagePreview

    if (move > 0) {
      if (index < imagesPreview.length - 1) {
        newPreviewImg = imagesPreview[index + move]
        setIndex(index + move)
      }
    } else if (move < 0) {
      if (index > 0) {
        newPreviewImg = imagesPreview[index + move]
        setIndex(index + move)
      }
    }

    setImagePreview(newPreviewImg)
  }

  return (
    <Modal className="modal-preview" visible={true} footer={null} onCancel={closeModal}>
      <div className={`modal-preview--action modal-preview--prev ${index == 0 && "modal-preview--action__disable"}`} onClick={handleChangePreview(-1)}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"><path d="M14.8597212,8.14512634 C15.0549834,8.34038849 15.0549834,8.65697098 14.8597212,8.85223312 L11.2137854,12.5 L14.8597212,16.1465919 C15.0549834,16.3418541 15.0549834,16.6584366 14.8597212,16.8536987 C14.6644591,17.0489609 14.3478766,17.0489609 14.1526144,16.8536987 L9.79957183,12.5 L14.1526144,8.14512634 C14.3478766,7.9498642 14.6644591,7.9498642 14.8597212,8.14512634 Z"></path></svg>
      </div>
      <img src={imagePreview} />
      <div className={`modal-preview--action modal-preview--next ${index == imagesPreview.length - 1 && "modal-preview--action__disable"}`} onClick={handleChangePreview(1)}>
        <svg viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px"><path d="M9.14644661,8.14512634 C9.34170876,7.9498642 9.65829124,7.9498642 9.85355339,8.14512634 L14.206596,12.5 L9.85355339,16.8536987 C9.65829124,17.0489609 9.34170876,17.0489609 9.14644661,16.8536987 C8.95118446,16.6584366 8.95118446,16.3418541 9.14644661,16.1465919 L12.7923824,12.5 L9.14644661,8.85223312 C8.95118446,8.65697098 8.95118446,8.34038849 9.14644661,8.14512634 Z"></path></svg>
      </div>
    </Modal>
  )
}

export default ModalPreviewImage