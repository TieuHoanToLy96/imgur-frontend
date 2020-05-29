import { Avatar, Modal } from "antd"
import Slider from "react-slick"
import { useState } from "react";

import ModalPreviewImage from "/components/ModalPreviewImage"

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const ModalViewStory = props => {
  const { indexPreview, story, closeModal } = props
  console.log(story, "sss")
  return (
    <ModalPreviewImage
      imagesPreview={story.contents ? story.contents.map(el => el.image) : []}
      indexPreview={indexPreview}
      closeModal={closeModal} />
  )
}

const ListStory = props => {
  const { listStory } = props
  const [visibleModal, setVisibleModa] = useState(false)
  const [story, setStory] = useState({})

  console.log(listStory, "listStorylistStorylistStorylistStory")
  const handleClickView = (el, index) => () => {
    console.log(index, "index")
    setVisibleModa(true)
    setStory(el)
  }

  return (
    <>
      <div className="story-list--wrapper">
        <div className="story-list">
          <div className="story-list--title is-flex is-flex--center mb-5">Câu chuyện</div>
          <Slider {...settings}>
            {
              listStory.map((el, index) => (
                <div key={index} className="story-item--wrapper" onClick={handleClickView(el, index)}>
                  <div className="story-item">
                    <div className="story-item--image">
                      <img src={el ?.contents[0] ?.image} />
                    </div>
                    <div className="story-item--info is-flex is-flex--space-between">
                      <div className="story-item--user">
                        <Avatar size={40} src={el ?.account ?.avatar} />
                      </div>
                      <div className="story-item--name">
                        {el ?.account ?.user_name}
                      </div>
                    </div>
                    <div className="story-item--overlay">
                    </div>
                  </div>


                </div>
              ))
            }
          </Slider>
        </div>
      </div>
      {
        visibleModal && <ModalViewStory {...props} indexPreview={0} closeModal={() => setVisibleModa(false)} story={story} />
      }
    </>
  )
}

export default ListStory