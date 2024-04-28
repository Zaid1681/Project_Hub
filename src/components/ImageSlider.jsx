import React, { useState, useEffect } from 'react';
import { BASEURL } from '../Api';
import axios from 'axios';
import Loader from './Loader';
const ImageSlider = ({ dataId }) => {
  const [imgData, setImgData] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASEURL}/project/get/${dataId}`);
      setImgData(response?.data?.image);
      setLoading(false); // Set loading to false after fetching data
    } catch (error) {
      console.log('Error fetching Project', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dataId]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imgData?.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imgData?.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative my-auto">
      {loading ? (
        // Show loader while fetching data
        <div className="bg-gray-200 text-gray-600 flex h-80 w-full items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="image-slider rounded-xl dark:bg-white/10 bg-black/10 p-4">
          <button
            className="slider-button prev-button absolute top-1/2 left-0 -translate-y-1/2 transform rounded-full bg-[#0C356A] py-1 px-3 text-white"
            onClick={goToPrevious}
          >
            &lt;
          </button>
          <div className="image-container">
            <img
              className="slider-image h-80 w-full object-cover md:h-80"
              src={imgData[currentIndex]}
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
      )}
    </div>
  );
};

export default ImageSlider;
