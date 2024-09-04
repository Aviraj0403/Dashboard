import React from 'react';
import imgage from "../../../images/food-menu-1.png";

function SingleItem({ imgUrl, title }) {
  return (
    <div className="border rounded-md overflow-hidden">
      <img
        src={imgage}
        alt="img"
        className="h-40 w-full object-cover border-b-2"
      />
      <p className="px-3 py-2 text-sm md:text-base lg:text-lg">{title}</p>
    </div>
  );
}

export default SingleItem;
