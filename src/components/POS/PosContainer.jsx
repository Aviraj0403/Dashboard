import React from "react";
import Input from "../commonUI/Input";
import Button from "../commonUI/Button";
import { FaSearch } from "react-icons/fa";
import FeaturedItem from "../dashboard/featured/FeaturedItem";
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
const filterItem = [
  {
    id: 1,
    name: "All Items",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
  {
    id: 2,
    name: "Appetizers",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
  {
    id: 3,
    name: "Flame Grill Burgers",
    src: "https://demo.foodscan.xyz/storage/28/conversions/flame_grill_burgers-thumb.png",
  },
  {
    id: 4,
    name: "Veggie & Plant Based Burgers",
    src: "https://demo.foodscan.xyz/storage/29/conversions/veggie_&_plant_based_burgers-thumb.png",
  },
  {
    id: 5,
    name: "Sandwich from the Grill",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
  {
    id: 6,
    name: "Hot Chicken Entrees",
    src: "https://demo.foodscan.xyz/storage/31/conversions/hot_chicken_entrees-thumb.png",
  },
  {
    id: 7,
    name: "Appetizers",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
  {
    id: 8,
    name: "Appetizers",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
  {
    id: 9,
    name: "Appetizers",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
  {
    id: 10,
    name: "Appetizers",
    src: "https://demo.foodscan.xyz/images/default/all-category.png",
  },
];
function PosContainer() {
  return (
    <div className="p-4">
      <div className="flex">
        <Input
          type="text"
          className="rounded-r-none border-r-0"
          placeholder="Search by Menu Item"
        />
        <Button className="rounded-l-none">
          <FaSearch />
        </Button>
      </div>
      {/* Filters items */}
      <div className="flex gap-2 mt-4">
        <div className="flex gap-2 overflow-x-scroll scrollbar-hide whitespace-nowrap w-[80vw] mx-auto">
          {filterItem.map((item, index) => {
            return (
              <div className="min-w-[8rem] h-auto border p-4 rounded-md border-b-4 border-b-blue-300 bg-slate-200 flex flex-col items-center">
                <img
                  className="w-10"
                  src={item.src}
                  alt=""
                />
                <div className="pt-1 flex flex-wrap"><p>{item.name}</p></div>
              </div>
            );
          })}
          {/* Repeat other items similarly */}
          {/* ... */}
        </div>
      </div>
      <FeaturedItem  data={items}/>
    </div>
  );
}



export default PosContainer;
