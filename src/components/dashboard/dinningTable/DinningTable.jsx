// DiningTable.jsx
import React, { useEffect, useState } from "react";
import RouterCumb from "../../router/RouterCumb";
import Input from "../../commonUI/Input";
import Button from "../../commonUI/Button";
import {
  FaEdit,
  FaEye,
  FaFileExport,
  FaFilter,
  FaPlus,
  FaPlusCircle,
  FaSearch,
} from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlineBarcode } from "react-icons/ai";
import Tooltip from "../../commonUI/Tooltip"; // Adjust the import path as necessary
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
// const tables = [
//   { id: 1, name: "Table 2", size: 8, status: "Active" },
//   { id: 2, name: "Table 1", size: 6, status: "Active" },
//   { id: 3, name: "Table 3", size: 4, status: "Inactive" },
// ];
const DiningTable = () => {
  const [tables, setTables] = useState([
    { id: 1, name: "Table 2", size: 8, status: "Active" },
    { id: 2, name: "Table 1", size: 6, status: "Active" },
    { id: 3, name: "Table 3", size: 4, status: "Inactive" },
  ]);
  const [filteredTables, setFilteredTables] = useState(tables);
  const [hoveredItem, setHoveredItem] = useState({
    isVisible: false,
    name: "",
    id: null,
  });
  const navigate = useNavigate();
  const { register, reset, handleSubmit } = useForm();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const handleCloseForm = () => {
    setIsOpenForm(!isOpenForm);
  };
  const handleAddTable = (data)=>{
   if (!data) {
     return
     
    }
    const  tInfo = {
      id:new Date(),
      name:data.tname,
      size:data.tsize,
      status:data.tstatus?"Active":"InActive"
     }
     console.log(tInfo);
     
    setTables(prev=>[...prev,tInfo])
    setIsOpenForm(false)
  }
  const filterTable = (data) => {
    const filteredData = tables.filter((table) => {
      const matchesName = table.name
        .toLowerCase()
        .includes(data.name?.toLowerCase() || "");
      const matchesSize = data.size
        ? table.size === parseInt(data.size, 10)
        : true;
      const matchesStatus = data.status
        ? table.status.toLowerCase() === data.status.toLowerCase()
        : true;

      return matchesName && matchesSize && matchesStatus;
    });

    setFilteredTables(filteredData);
  };

  const handleHovered = (name, tableid) => {
    setHoveredItem({ isVisible: true, name, id: tableid });
  };

  const handleMouseLeave = () => {
    setHoveredItem({ isVisible: false, name: "", id: null });
  };

  const [activeFilter, setActiveFilter] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* <RouterCumb /> */}

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-600">Dining Tables</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveFilter(!activeFilter)}
              className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-4 py-2 rounded-md flex items-center gap-1"
            >
              <FaFilter /> Filter
            </button>
            <button className="bg-blue-50 text-blue-500 hover:bg-blue-100 px-4 py-2 rounded-md flex items-center gap-1">
              <FaFileExport /> Export
            </button>
            <button
              onClick={handleCloseForm}
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md flex items-center gap-1"
            >
              <FaPlusCircle /> Add Tables
            </button>
          </div>
          
        </div>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            activeFilter ? "max-h-60" : "max-h-0"
          }`}
        >
          <div className="p-4 bg-gray-100 rounded-md">
            <form
              onSubmit={handleSubmit(filterTable)}
              className="flex flex-wrap flex-col justify-between"
            >
              <div className="flex gap-1 ">
                <Input
                  label="Name"
                  placeholder="Name"
                  className="rounded-md py-2"
                  {...register("name")}
                />
                <Input
                  label="Size"
                  placeholder="Size"
                  className="rounded-md py-2"
                  type="number"
                  {...register("size")}
                />
                <Input
                  label="Status"
                  placeholder="Status"
                  className="rounded-md py-2"
                  {...register("status")}
                />
              </div>
              <div className="flex flex-wrap items-center gap-5 py-5">
                <Button
                  type="submit"
                  className="bg-blue-700 flex items-center gap-1"
                >
                  <FaSearch /> Search
                </Button>
                <div
                  type="reset"
                  onClick={() => {
                    reset();
                    setActiveFilter(false);
                  }}
                  className="flex items-center gap-1 text-white px-4 py-2 rounded-lg bg-gray-700"
                >
                  <MdClose /> Clear
                </div>
              </div>
            </form>
          </div>
        </div>

        <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-4">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Size</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <tr key={table.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{table.name}</td>
                <td className="px-4 py-2">{table.size}</td>
                <td className="px-4 py-2">
                  <span
                    className={` ${
                      table.status.toLowerCase() === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    } text-sm  px-2 py-1 rounded-full`}
                  >
                    {table.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-5 space-x-2 relative">
                  {/* QR Button  here */}
                  <div className="relative">
                    <button
                      onMouseEnter={() => handleHovered("QR", table.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-yellow-500 relative hover:text-yellow-700 rounded-md border p-2 bg-yellow-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <AiOutlineBarcode />
                    </button>
                    <Tooltip
                      text="QR"
                      isVisible={
                        hoveredItem.isVisible &&
                        hoveredItem.name === "QR" &&
                        hoveredItem.id === table.id
                      }
                    />
                  </div>

                  {/* View Button  here */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        navigate("/dinning/table/" + table.id);
                      }}
                      onMouseEnter={() => handleHovered("VIEW", table.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-blue-500 relative hover:text-blue-700 rounded-md p-2 bg-blue-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaEye />
                    </button>
                    <Tooltip
                      text="VIEW"
                      isVisible={
                        hoveredItem.isVisible &&
                        hoveredItem.name === "VIEW" &&
                        hoveredItem.id === table.id
                      }
                    />
                  </div>

                  {/* Edit Button  here */}
                  <div className="relative">
                    <button
                      onMouseEnter={() => handleHovered("EDIT", table.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-green-500 relative hover:text-green-700 rounded-md p-2 bg-green-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaEdit />
                    </button>
                    <Tooltip
                      text="EDIT"
                      isVisible={
                        hoveredItem.isVisible &&
                        hoveredItem.name === "EDIT" &&
                        hoveredItem.id === table.id
                      }
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-sm text-gray-500">
          Showing 1 to {tables.length} of {tables.length} entries
        </div>
      </div>
   {/* handling all the modals at last  */}
      <Modal
            isOpen={isOpenForm}
            onClose={() => setIsOpenForm(false)}
            title="Dinning Table"
          >
            <form
              onSubmit={handleSubmit(handleAddTable)}
              className="flex flex-wrap flex-col justify-between p-4"
            >
              <div className="flex flex-col gap-1 ">
                <Input
                  label="Name"
                  placeholder="Name"
                  className="rounded-md py-2"
                  {...register("tname")}
                />
                <Input
                  label="Size"
                  placeholder="Size"
                  className="rounded-md py-2"
                  type="number"
                  {...register("tsize")}
                />
                <label htmlFor="status">Status</label>
                <div className=" flex  items-center gap-4">
                  <input type="radio" name="status" id="Active" defaultChecked {...register('tstatus')} />
                  <label htmlFor="Active" id="status">
                    Active
                  </label>
                  <input type="radio" name="status" id="InActive" {...register('tstatus')} />
                  <label htmlFor="InActive" id="status">
                    InActive
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-5 py-5">
                <Button
                  type="submit"
                  className="bg-blue-700 flex items-center gap-1"
                >
                  <FaSearch /> Search
                </Button>
                <div
                  type="reset"
                  onClick={() => {
                    reset();
                    setActiveFilter(false);
                  }}
                  className="flex items-center gap-1 text-white px-4 py-2 rounded-lg bg-gray-700"
                >
                  <MdClose /> Clear
                </div>
              </div>
            </form>
          </Modal>
    </div>
  );
};

export default DiningTable;
