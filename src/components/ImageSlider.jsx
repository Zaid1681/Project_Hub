import React, { useState } from 'react';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.png';

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [img1, img2];

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider relative ">
      <button
        className="slider-button prev-button absolute top-1/2 left-0 -translate-y-1/2 transform rounded-full bg-[#0C356A] py-1 px-3 text-white"
        onClick={goToPrevious}
      >
        &lt;
      </button>
      <div className="image-container">
        <img
          className="slider-image h-60 w-full object-cover md:h-80"
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
        />
      </div>
      <button
        className="slider-button next-button absolute top-1/2 right-0 -translate-y-1/2 transform rounded-full bg-[#0C356A] py-1 px-3 text-white"
        onClick={goToNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default ImageSlider;
