import React from "react";

const urlImage =
  "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/255035532/original/018490e7fadacc208a24273e4866f68bb55ba2c0/do-machine-learning-and-deep-learning-projects.jpg";

const CardThree = () => {
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

export default CardThree;
