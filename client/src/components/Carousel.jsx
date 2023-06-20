import { useState, useEffect, useCallback } from "react";
import { RxDot, RxDotFilled } from 'react-icons/rx';
import './Carousel.css';
import { Link } from "react-router-dom";

export function Carousel({ images }) {
  const [current, setCurrent] = useState(0);

  const handleRightButton = useCallback(() => setCurrent((current + 1) % images.length), [current, images]);

  useEffect(() => {
    const intervalId = setInterval(handleRightButton, 7000);
    return () => clearInterval(intervalId);
  }, [handleRightButton]);

  return (
    <div className="container text-center text-white">
      <div className="top-row carousel-bg-img">
        <div className="pos-rel">
          <Link className="pos-rel z-index" to={`/details/${images[current].id}`}>
            <img className="img-carousel" alt={images[current].name} src={images[current].src} />
          </Link>
          <img className="new-items" src="https://img.freepik.com/free-icon/new_318-305431.jpg" alt="new"/>
        </div>
        <div className="col-12 col-sm-5">
          <h2 className="mt-5">{images[current].name}</h2>
          <p>{images[current].description}</p>
        </div>
        <div className="col-12">
          {images.map((image, index) =>
            <Dot key={index}
            click={() =>
            setCurrent(index)}
            isActive={index === current} />)}
        </div>
      </div>
    </div>
  )
}

export function Dot({ isActive, click }) {
  return (
    isActive ? <button className="button-carousel">
      <RxDotFilled style={{ fontSize: "4rem" }} />
    </button>
      : <button className="button-carousel" onClick={click}>
        <RxDot style={{ fontSize: "4rem" }} />
    </button>
  )
}
