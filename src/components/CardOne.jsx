import React from "react";

const urlImage =
  "https://www.liquidplanner.com/wp-content/uploads/2019/04/HiRes-17.jpg";

const CardOne = () => {
  return (
    <div className="w-full h-40 object-cover shadow-default dark:border-strokedark dark:bg-boxdark">
      <img
        src={urlImage}
        alt="Card"
        className="w-full h-40 object-cover"
      />
    </div>
  );
};

export default CardOne;
