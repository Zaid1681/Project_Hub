import React, { useState } from 'react';
import img1 from '../images/img1.jpg';
import img2 from '../images/img2.png';

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [img1, img2];

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="image-slider relative ">
            <button className="bg-[#0C356A] text-white py-1 px-3 rounded-full slider-button prev-button absolute top-1/2 left-0 transform -translate-y-1/2" onClick={goToPrevious}>
                &lt;
            </button>
            <div className="image-container">
                <img className="slider-image h-60 md:h-80 w-full object-cover" src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
            </div>
            <button className="bg-[#0C356A] text-white py-1 px-3 rounded-full slider-button next-button absolute top-1/2 right-0 transform -translate-y-1/2" onClick={goToNext}>
                &gt;
            </button>
        </div>
    );
};

export default ImageSlider;
