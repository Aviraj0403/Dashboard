import React, { useState } from "react";
import { FaChartLine, FaClipboardList, FaUser } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";
import BookingChart from "../chart/BookingChart";
import FeaturedItem from "./featured/FeaturedItem";
import { Outlet } from "react-router-dom";


const items = [
  { id: 1, name: 'Sesame Chicken', image: 'https://demo.foodscan.xyz/storage/61/conversions/sweet_&_sour_chicken-thumb.png' },
  { id: 2, name: 'Sweet & Sour Chicken', image: 'https://demo.foodscan.xyz/storage/61/conversions/sweet_&_sour_chicken-thumb.png' },
  { id: 3, name: 'Wonton Soup', image: 'https://demo.foodscan.xyz/storage/79/conversions/wonton_soup-thumb.png' },
  { id: 4, name: 'American BBQ Double', image: 'https://demo.foodscan.xyz/storage/43/conversions/american_bbq_double-thumb.png' },
  { id: 5, name: 'Vegetable Roll', image: 'https://demo.foodscan.xyz/storage/42/conversions/vegetable_roll-thumb.png' },
  { id: 6, name: 'Plain Grilled Chicken', image: 'https://demo.foodscan.xyz/storage/56/conversions/plain_grilled_chicken-thumb.png' },
  { id: 7, name: 'Roasted Salmon Salad', image: 'https://demo.foodscan.xyz/storage/75/conversions/roasted_salmon_salad-thumb.png' },
  { id: 8, name: 'Yemete Kudasai Chicken', image: 'https://demo.foodscan.xyz/storage/62/conversions/yemete_kudasai_chicken-thumb.png' },
];
function Dashboard() {
  console.log('hello dashboard');
  
  const [currentTime,setCurrentTime] = useState(new Date().toLocaleTimeString().split(" ")[1])
  return (
    <main className="flex-grow p-4 overflow-scroll ">
      {/* Heading or notification bar  */}
      <div className=" rounded-sm shadow-md  bg-red-100 px-3 py-2 mb-1 ">
        <h2 className=" text-xl font-semibold">
          Heading of Notification or Alert
        </h2>
        <p>For Notification purpose </p>
      </div>
      {/* greeting bars  */}
      <div className="  px-3 py-2 mb-1 ">
        <h2 className={` ${currentTime==='AM'?"text-blue-600":"text-orange-500"} text-2xl font-bold`}>
          {new Date().toLocaleTimeString().split(" ")[1] === "AM"
            ? "Good Morning!"
            : "Good Afternoon"}
        </h2>
        <p>For greeting purpose </p>
      </div>
      {/* overview pannel  */}
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 text-white">
        <div className="bg-[#FF4F99] p-4 max-sm:justify-start max-sm:gap-4 rounded shadow flex items-center justify-between px-6">
          <FaChartLine size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Sales</h3>
            <p className="text-3xl font-bold">$0.00</p>
          </div>
        </div>
        <div className="bg-[#8262FE] p-4 max-sm:justify-start max-sm:gap-4 rounded shadow flex items-center justify-between px-6">
          <FaClipboardList size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        <div className="bg-[#567DFF] p-4 max-sm:justify-start max-sm:gap-4 rounded shadow flex items-center justify-between px-6">
          <MdMenuBook size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Customers</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
        <div className="bg-[#A953FF] p-4 max-sm:justify-start max-sm:gap-4 rounded shadow flex items-center justify-between px-6">
          <FaUser size={38} />
          <div>
            <h3 className="text-xl font-bold mb-2">Total Menu Items</h3>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
      {/* charts pannel  */}
      <div className=" grid lg:grid-cols-2 sm:grid-cols-1 gap-2 py-3  ">
        <BookingChart title={"Sales Report"} url={"/ticket/tickets/all"} />
        <BookingChart title={"Sales Report"} url={"/ticket/tickets/all"} />
      <FeaturedItem title={"Featured Items"} data={items}/>
      <FeaturedItem title={"Most Popular Items"} data={items}/>
      </div>
      <Outlet/>
    </main>
  );
}

export default Dashboard;
