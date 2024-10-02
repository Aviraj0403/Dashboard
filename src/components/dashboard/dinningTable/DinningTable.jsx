import React, { useEffect, useState } from "react";
import RouterCumb from "../../router/RouterCumb";
import Input from "../../commonUI/Input";
import Button from "../../commonUI/Button";
import { FaEdit, FaEye, FaFileExport, FaFilter, FaPlusCircle, FaSave, FaSearch, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlineBarcode } from "react-icons/ai";
import Tooltip from "../../commonUI/Tooltip";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "../../modal/Modal";
import { toast } from "react-toastify";
import axios from "axios";
import { useRestaurantId } from "../../../context/userContext.jsx";

const DiningTable = () => {
  const [tables, setTables] = useState([]);
  const [filteredTables, setFilteredTables] = useState([]);
  const [hoveredItems, setHoveredItems] = useState({});
  const [editTableData, setEditTableData] = useState(null);
  const navigate = useNavigate();
  const { register, reset, handleSubmit, setValue } = useForm();
  const [isOpenForm, setIsOpenForm] = useState({ formName: "", tableId: null });
  const restaurantId = useRestaurantId();
  const URL = "http://localhost:4000";

  const handleCloseForm = () => {
    setIsOpenForm({ formName: "", tableId: null });
    reset();
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get(`${URL}/api/table/${restaurantId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.data.success) {
        setTables(response.data.data);
        setFilteredTables(response.data.data);
      } else {
        toast.error(response.data.message || "Error fetching tables");
      }
    } catch (error) {
      toast.error(error.message || "Error fetching tables");
    }
  };

  useEffect(() => {
    if (restaurantId) {
      fetchTables();
    } else {
      toast.error("Restaurant ID not found");
    }
  }, [restaurantId]);

  const handleAddTable = async (data) => {
    if (!data) return;

    const tInfo = {
      name: data.tname,
      size: data.tsize,
      status: data.tstatus ? "Active" : "Inactive",
      restaurantId,
    };

    try {
      const response = await axios.post(`${URL}/api/table/${restaurantId}`, tInfo, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.data.success) {
        fetchTables();
        toast.success("Table added successfully");
        reset();
      } else {
        toast.error(response.data.message || "Error adding table");
      }
    } catch (error) {
      toast.error(error.message || "Error adding table");
    }
  };

  const handleEditClick = (tableId) => {
    const tableToEdit = tables.find((table) => table.tableId === tableId);
    if (tableToEdit) {
      setEditTableData(tableToEdit);
      setValue("name", tableToEdit.name);
      setValue("size", tableToEdit.size);
      setValue("status", tableToEdit.status === "Active");
      setIsOpenForm({ formName: "edit", tableId }); // Use tableId directly
    }
  };
  
  const handleEditTable = async (data) => {
    const updatedTable = {
        name: data.name,
        size: data.size,
        status: data.status ? "Active" : "Inactive",
    };

    // Confirm before proceeding with the update
    if (window.confirm("Are you sure you want to update this table?")) {
        try {
            const response = await axios.put(`${URL}/api/table/${restaurantId}/${editTableData.tableId}`, updatedTable, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (response.data.success) {
                fetchTables(); // Refresh the list of tables
                toast.success("Table updated successfully");
                handleCloseForm(); // Close the form/modal
            } else {
                toast.error(response.data.message || "Error updating table");
            }
        } catch (error) {
            // Improved error handling
            if (error.response) {
                // Server responded with a status other than 200
                toast.error(error.response.data.message || "Error updating table");
            } else if (error.request) {
                // Request was made but no response was received
                toast.error("No response from server. Please try again later.");
            } else {
                // Something happened in setting up the request
                toast.error("Error: " + error.message);
            }
        }
    }
};

  
  

  const handleDeleteTable = async (tableId) => {
    if (window.confirm("Are you sure you want to delete this table?")) {
      try {
        const response = await axios.delete(`${URL}/api/table/${restaurantId}/${tableId}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data.success) {
          fetchTables();
          toast.success("Table deleted successfully");
        } else {
          toast.error(response.data.message || "Error deleting table");
        }
      } catch (error) {
        toast.error(error.message || "Error deleting table");
      }
    }
  };

  const filterTable = (data) => {
    const filteredData = tables.filter((table) => {
      const matchesName = table.name.toLowerCase().includes(data.name?.toLowerCase() || "");
      const matchesSize = data.size ? table.size === parseInt(data.size, 10) : true;
      const matchesStatus = data.status ? table.status.toLowerCase() === data.status.toLowerCase() : true;

      return matchesName && matchesSize && matchesStatus;
    });

    setFilteredTables(filteredData);
  };

  const handleMouseEnter = (name, id) => {
    setHoveredItems((prev) => ({ ...prev, [id]: name }));
  };

  const handleMouseLeave = (id) => {
    setHoveredItems((prev) => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  const [activeFilter, setActiveFilter] = useState(false);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-4">
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
              onClick={() => setIsOpenForm({ formName: "add" })}
              className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md flex items-center gap-1"
            >
              <FaPlusCircle /> Add Tables
            </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeFilter ? "max-h-60" : "max-h-0"}`}>
          <div className="p-4 bg-gray-100 rounded-md">
            <form onSubmit={handleSubmit(filterTable)} className="flex flex-wrap flex-col justify-between">
              <div className="flex gap-1">
                <Input label="Name" placeholder="Name" className="rounded-md py-2" {...register("name")} />
                <Input label="Size" placeholder="Size" className="rounded-md py-2" type="number" {...register("size")} />
                <Input label="Status" placeholder="Status" className="rounded-md py-2" {...register("status")} />
              </div>
              <div className="flex flex-wrap items-center gap-5 py-5">
                <Button type="submit" className="bg-blue-700 flex items-center gap-1">
                  <FaSearch /> Search
                </Button>
                <div
                  type="reset"
                  onClick={() => reset()}
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
              <tr key={table.tableId} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{table.name}</td>
                <td className="px-4 py-2">{table.size}</td>
                <td className="px-4 py-2">
                  <span className={`${table.status.toLowerCase() === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"} rounded-full px-2 py-1`}>
                    {table.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex gap-5 space-x-2 relative">
                  <div className="relative">
                    <button
                      onMouseEnter={() => handleMouseEnter("QR", table.tableId)}
                      onMouseLeave={() => handleMouseLeave(table.tableId)}
                      className="text-yellow-500 relative hover:text-yellow-700 rounded-md border p-2 bg-yellow-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <AiOutlineBarcode />
                    </button>
                    <Tooltip text="QR" isVisible={hoveredItems[table.tableId] === "QR"} />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => navigate("table/" + table.tableId)}
                      onMouseEnter={() => handleMouseEnter("VIEW", table.tableId)}
                      onMouseLeave={() => handleMouseLeave(table.tableId)}
                      className="text-blue-500 relative hover:text-blue-700 rounded-md p-2 bg-blue-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaEye />
                    </button>
                    <Tooltip text="VIEW" isVisible={hoveredItems[table.tableId] === "VIEW"} />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleEditClick(table.tableId)}
                      onMouseEnter={() => handleMouseEnter("EDIT", table.tableId)}
                      onMouseLeave={() => handleMouseLeave(table.tableId)}
                      className="text-green-500 relative hover:text-green-700 rounded-md p-2 bg-green-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaEdit />
                    </button>
                    <Tooltip text="EDIT" isVisible={hoveredItems[table.tableId] === "EDIT"} />
                  </div>

                  <div className="relative">
                    <button
                      onClick={() => handleDeleteTable(table.tableId)}
                      onMouseEnter={() => handleMouseEnter("DELETE", table.tableId)}
                      onMouseLeave={() => handleMouseLeave(table.tableId)}
                      className="text-red-500 relative hover:text-red-700 rounded-md p-2 bg-red-100 transition-transform duration-300 ease-in-out transform hover:scale-110"
                    >
                      <FaTrash />
                    </button>
                    <Tooltip text="DELETE" isVisible={hoveredItems[table.tableId] === "DELETE"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-4 text-sm text-gray-500">
          Showing 1 to {filteredTables.length} of {tables.length} entries
        </div>
      </div>

      {/* Add modal */}
      <Modal isOpen={isOpenForm.formName === "add"} onClose={handleCloseForm} title="Dining Table">
        <form onSubmit={handleSubmit(handleAddTable)} className="flex flex-wrap flex-col justify-between p-4">
          <div className="flex flex-col gap-1">
            <Input label="Name" placeholder="Name" className="rounded-md py-2" {...register("tname")} />
            <Input label="Size" placeholder="Size" className="rounded-md py-2" type="number" {...register("tsize")} />
            <label htmlFor="status">Status</label>
            <div className="flex items-center gap-4">
              <input type="radio" name="status" id="Active" defaultChecked {...register("tstatus")} />
              <label htmlFor="Active">Active</label>
              <input type="radio" name="status" id="InActive" {...register("tstatus")} />
              <label htmlFor="InActive">Inactive</label>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 py-5">
            <Button type="submit" className="bg-blue-700 flex items-center gap-1">
              <FaSave /> Save
            </Button>
            <div
              onClick={() => {
                reset();
                handleCloseForm();
              }}
              className="flex items-center gap-1 text-white px-4 py-2 rounded-lg bg-gray-700"
            >
              <MdClose /> Close
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit modal */}
      <Modal isOpen={isOpenForm.formName === "edit"} onClose={handleCloseForm} title="Edit Dining Table">
        <form onSubmit={handleSubmit(handleEditTable)} className="flex flex-wrap flex-col justify-between p-4">
          <div className="flex flex-col gap-1">
            <Input label="Name" placeholder="Name" className="rounded-md py-2" defaultValue={editTableData?.name} {...register("name")} />
            <Input label="Size" placeholder="Size" defaultValue={editTableData?.size} className="rounded-md py-2" type="number" {...register("size")} />
            <label htmlFor="status">Status</label>
            <div className="flex items-center gap-4">
              <input type="radio" name="status" id="Active" value="Active" defaultChecked={editTableData?.status === "Active"} {...register("status")} />
              <label htmlFor="Active">Active</label>
              <input type="radio" name="status" id="InActive" value="Inactive" defaultChecked={editTableData?.status === "Inactive"} {...register("status")} />
              <label htmlFor="InActive">Inactive</label>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-5 py-5">
            <Button type="submit" className="bg-blue-700 flex items-center gap-1">
              <FaSave /> Save
            </Button>
            <div
              onClick={() => {
                reset();
                handleCloseForm();
              }}
              className="flex items-center gap-1 text-white px-4 py-2 rounded-lg bg-gray-700"
            >
              <MdClose /> Close
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DiningTable;
