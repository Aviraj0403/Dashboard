import React, { useState } from "react";
import Container from "../../../components/commonUI/Container";
import { FaFilter,FaFileExport,FaPlusCircle } from "react-icons/fa";
import { AiOutlineBarcode } from "react-icons/ai";
import Tooltip from "../../../components/commonUI/Tooltip";
import { FaEye,FaEdit } from "react-icons/fa";
const filteredTables = [
  { id: 1, name: "Branch 2", size: 8, status: "Active" },
  { id: 2, name: "Branch 1", size: 6, status: "Active" },
  { id: 3, name: "Branch 3", size: 4, status: "Inactive" },
];
function Branch() {
    const  handleMouseLeave =()=>{}
    const [hoveredItem,setHoveredItem] =useState({isVisible:false,name:'',id:null})
    // const [isVisible,setIsVisible] = useState(false)
  return (
    <Container title="Branches" className='bg-white h-fit'>
      <div className="bg-white rounded-lg shadow-md p-4">
        {/* <RouterCumb /> */}

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-600">Dining Tables</h3>
          <div className="flex space-x-2">
           
            <button
              onClick={() => setIsOpenForm({ formName: "add" })}
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md flex items-center gap-1"
            >
              <FaPlusCircle /> Add Branch
            </button>
          </div>
        </div>


        <table className="min-w-full bg-white border border-gray-200 rounded-lg mt-4">
          <thead>
            <tr className="text-left border-b">
              <th className="px-4 py-2">Name</th>
              {/* <th className="px-4 py-2">Size</th> */}
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTables.map((table) => (
              <tr key={table.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{table.name}</td>
                {/* <td className="px-4 py-2">{table.size}</td> */}
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
                  

                  {/* View Button  here */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        navigate("table/" + table.id);
                      }}
                      onMouseEnter={() => handleHovered("VIEW", table.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-blue-500 relative flex gap-2 items-center hover:text-blue-700 rounded-md p-2 bg-blue-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaEye /> View
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
                      onClick={() => handleEditClick(table.id)}
                      onMouseEnter={() => handleHovered("EDIT", table.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-green-500 relative flex gap-2 items-center hover:text-green-700 rounded-md p-2 bg-green-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaEdit /> Edit
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
                  {/* DELETE Button  here */}
                  <div className="relative">
                    <button
                      onMouseEnter={() => handleHovered("QR", table.id)}
                      onMouseLeave={handleMouseLeave}
                      className="text-yellow-500 relative flex gap-2 items-center hover:text-yellow-700 rounded-md border p-2 bg-yellow-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <AiOutlineBarcode /> Delete
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-sm text-gray-500">
          Showing 1 to {filteredTables.length} of {filteredTables.length} entries
        </div>
      </div>
    </Container>
  );
}

export default Branch;
