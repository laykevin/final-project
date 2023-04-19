import { useState, useEffect } from "react";
import { RxDot, RxDotFilled } from 'react-icons/rx';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi'

export default function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(handleRightButton, 5000);
    return () => clearInterval(intervalId);
  });

  function handleLeftButton() {
    setCurrent(((current - 1) + images.length) % images.length)
  }

  function handleRightButton() {
    setCurrent((current + 1) % images.length)
  }

  return (
    <div>
      <div className="top-row">
        <LeftButton click={handleLeftButton} />
        <img className={current === 4 ? "spin" : undefined} alt={images[current].name} src={images[current].src} />
        <RightButton click={handleRightButton} />
      </div>
      {images.map((image, index) =>
        <Dot key={index}
          click={() =>
            setCurrent(index)}
          isActive={index === current} />)}
    </div>
  )
}

function Dot({ isActive, click }) {
  return (
    isActive ? <button style={{ marginTop: "2rem" }}>
      <RxDotFilled style={{ fontSize: "4rem" }} />
    </button>
      : <button onClick={click} style={{ marginTop: "2rem" }}>
        <RxDot style={{ fontSize: "4rem" }} />
      </button>
  )
}

function LeftButton({ click }) {
  return (
    <button onClick={click} style={{ marginRight: "7rem" }} >
      <HiOutlineChevronLeft style={{ fontSize: '5rem' }} />
    </button>
  )
}

function RightButton({ click }) {
  return (
    <button onClick={click} style={{ marginLeft: "7rem" }}>
      <HiOutlineChevronRight style={{ fontSize: '5rem' }} />
    </button>
  )
}
