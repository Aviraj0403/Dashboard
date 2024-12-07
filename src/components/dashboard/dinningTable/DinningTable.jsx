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
import Cookies from 'js-cookie';
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
  const URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  const fetchTables = async () => {
    const accessToken = Cookies.get('accessToken');
    try {
      const response = await axios.get(`${URL}/api/table/${restaurantId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
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
      if (error.response?.status === 401) {
        const refreshToken = Cookies.get('refreshToken');
        if (refreshToken) {
          try {
            const refreshResponse = await axios.post(`${URL}/api/refresh-token`, { refreshToken }, {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            });

            const newAccessToken = refreshResponse.data.accessToken;
            Cookies.set('accessToken', newAccessToken);

            const retryResponse = await axios.get(`${URL}/api/table/${restaurantId}`, {
              headers: { 'Authorization': `Bearer ${newAccessToken}` },
              withCredentials: true,
            });

            setTables(retryResponse.data.data);
            setFilteredTables(retryResponse.data.data);
          } catch (refreshError) {
            toast.error("Failed to refresh the token");
          }
        } else {
          toast.error("No refresh token available");
        }
      } else {
        toast.error(error.message || "Error fetching tables");
      }
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

    if (window.confirm("Are you sure you want to update this table?")) {
      try {
        const response = await axios.put(`${URL}/api/table/${restaurantId}/${editTableData.tableId}`, updatedTable, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.data.success) {
          fetchTables();
          toast.success("Table updated successfully");
          handleCloseForm();
        } else {
          toast.error(response.data.message || "Error updating table");
        }
      } catch (error) {
        toast.error(error.message || "Error updating table");
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
        <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <h3 className="text-lg font-semibold text-gray-600 w-full sm:w-auto">Dining Tables</h3>
          <div className="flex space-x-2 gap-2 sm:gap-4">
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
            <form onSubmit={handleSubmit(filterTable)} className="flex flex-wrap flex-col gap-4 sm:flex-row sm:justify-between sm:gap-5">
              <div className="flex gap-1 sm:w-1/3">
                <Input label="Name" placeholder="Name" className="rounded-md py-2 w-full" {...register("name")} />
                <Input label="Size" placeholder="Size" className="rounded-md py-2 w-full sm:w-1/2" type="number" {...register("size")} />
                <Input label="Status" placeholder="Status" className="rounded-md py-2 w-full sm:w-1/2" {...register("status")} />
              </div>
              <div className="flex flex-wrap items-center gap-5 py-5 w-full sm:w-auto sm:justify-end">
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

        <div className="overflow-x-auto">
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
        </div>

        <div className="mt-4">{tables.length === 0 && <div className="text-center text-gray-500">No tables found</div>}</div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isOpenForm.formName !== ""}
        onClose={() => setIsOpenForm({ formName: "", tableId: null })}
        title={isOpenForm.formName === "add" ? "Add Table" : "Edit Table"}
      >
        <form
          onSubmit={handleSubmit(isOpenForm.formName === "add" ? handleAddTable : handleEditTable)}
          className="space-y-4"
        >
          <Input
            label="Name"
            placeholder="Enter Table Name"
            defaultValue={editTableData?.name || ""}
            {...register("tname")}
            required
          />
          <Input
            label="Size"
            placeholder="Enter Table Size"
            type="number"
            defaultValue={editTableData?.size || ""}
            {...register("tsize")}
            required
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="status"
              {...register("tstatus")}
              defaultChecked={editTableData?.status === "Active"}
            />
            <label htmlFor="status" className="ml-2 text-sm">
              Active
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <Button type="submit" className="bg-blue-600 text-white">
              <FaSave /> Save
            </Button>
            <Button
              type="button"
              className="bg-gray-600 text-white"
              onClick={() => setIsOpenForm({ formName: "", tableId: null })}
            >
              <MdClose /> Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DiningTable;
