import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MdEdit, MdDelete, MdAdd, MdKey } from 'react-icons/md';

// Sample role data with permissions
const rolesData = [
  { id: 1, name: 'Admin', members: 1 },
  { id: 2, name: 'Customer', members: 2 },
  { id: 3, name: 'Waiter', members: 0 },
  { id: 4, name: 'Chef', members: 0 },
  { id: 5, name: 'Branch Manager', members: 1 },
  { id: 6, name: 'POS Operator', members: 1 },
  { id: 7, name: 'Stuff', members: 1 },
  { id: 8, name: 'Avi', members: 0 },
];

const RolePermissions = () => {
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [roles, setRoles] = useState(rolesData);
  const [newRole, setNewRole] = useState('');
  const [editRoleIndex, setEditRoleIndex] = useState(null);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);
  const [permissions, setPermissions] = useState({
    Dashboard: false,
    Items: false,
    POS: false,
    'Dining Tables': false,
    'POS Orders': false,
    'Table Orders': false,
    Offers: false,
    Administrators: false,
    'Delivery Boys': false,
    Customers: false,
    Employees: false,
    'Transactions': false,
    'Sales Report': false,
    'Items Report': false,
    'Credit Balance Report': false,
    Settings: false
  });

  const handleAddRole = () => {
    if (editRoleIndex !== null) {
      const updatedRoles = [...roles];
      updatedRoles[editRoleIndex] = { ...updatedRoles[editRoleIndex], name: newRole };
      setRoles(updatedRoles);
      setEditRoleIndex(null);
    } else {
      setRoles([...roles, { id: roles.length + 1, name: newRole, members: 0, permissions }]);
    }
    setNewRole('');
    setIsAddRoleOpen(false);
  };

  const openEditModal = (index) => {
    setNewRole(roles[index].name);
    setEditRoleIndex(index);
    setIsAddRoleOpen(true);
  };

  const openPermissionsModal = (index) => {
    setSelectedRoleIndex(index);
    setPermissions(roles[index].permissions || {
      Dashboard: false,
      Items: false,
      POS: false,
      'Dining Tables': false,
      'POS Orders': false,
      'Table Orders': false,
      Offers: false,
      Administrators: false,
      'Delivery Boys': false,
      Customers: false,
      Employees: false,
      'Transactions': false,
      'Sales Report': false,
      'Items Report': false,
      'Credit Balance Report': false,
      Settings: false
    });
    setIsPermissionsOpen(true);
  };

  const handleSavePermissions = () => {
    if (selectedRoleIndex !== null) {
      const updatedRoles = [...roles];
      updatedRoles[selectedRoleIndex] = { ...updatedRoles[selectedRoleIndex], permissions };
      setRoles(updatedRoles);
    }
    setIsPermissionsOpen(false);
  };

  return (
    <div className="relative">
      {/* Background overlay */}
      {(isAddRoleOpen || isPermissionsOpen) && (
        <div className="modal-overlay fixed inset-0 bg-black bg-opacity-30 z-40" />
      )}
      
      {/* Content with blur effect */}
      <div className={`content relative transition-all ${isAddRoleOpen || isPermissionsOpen ? 'blur-md' : ''} z-10`}>
        <div className="w-full max-w-4xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Role & Permissions</h2>
            <button
              onClick={() => setIsAddRoleOpen(true)}
              className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition"
            >
              <MdAdd className="inline mr-2" size={20} />
              Add Role
            </button>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Role</th>
                <th className="border border-gray-300 px-4 py-2">Members</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role, index) => (
                <tr key={role.id}>
                  <td className="border border-gray-300 px-4 py-2">{role.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{role.members}</td>
                  <td className="border border-gray-300 px-4 py-2 flex space-x-2">
                    <button
                      onClick={() => openEditModal(index)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 transition"
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      onClick={() => openPermissionsModal(index)}
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                    >
                      <MdKey size={20} />
                    </button>
                    <button
                      onClick={() => setRoles(roles.filter((_, i) => i !== index))}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                    >
                      <MdDelete size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Role Modal */}
      <Dialog open={isAddRoleOpen} onClose={() => setIsAddRoleOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative z-50">
            <Dialog.Title className="text-lg font-semibold mb-4">
              {editRoleIndex !== null ? 'Edit Role' : 'Add Role'}
            </Dialog.Title>
            <form>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700">Role Name</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter role name"
                  />
                </div>
              </div>
              <div className="flex space-x-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddRoleOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleAddRole}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Permissions Modal */}
      <Dialog open={isPermissionsOpen} onClose={() => setIsPermissionsOpen(false)} className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="flex items-center justify-center h-full">
          <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md relative z-50">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Permissions for {roles[selectedRoleIndex]?.name}
            </Dialog.Title>
            <form>
              <div className="grid grid-cols-1 gap-4">
                {Object.keys(permissions).map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={permissions[permission]}
                      onChange={(e) => setPermissions({ ...permissions, [permission]: e.target.checked })}
                      className="h-4 w-4"
                    />
                    <label className="ml-2 text-sm font-medium text-gray-700">{permission}</label>
                  </div>
                ))}
              </div>
              <div className="flex space-x-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setIsPermissionsOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSavePermissions}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RolePermissions;
