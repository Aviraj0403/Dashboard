import React from 'react';

const CompanyForm = () => {
  return (
    <div className=" w-full mx-auto px-4 py-8 bg-white shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Company</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Name *</label>
          <input
            type="text"
            placeholder="Company Name"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Email *</label>
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Phone *</label>
          <input
            type="text"
            placeholder="Phone Number"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Website</label>
          <input
            type="url"
            placeholder="Website URL"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">City *</label>
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">State *</label>
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Country Code *</label>
          <select className="border border-gray-300 rounded-md p-2">
            <option value="BD">Bangladesh (BGD)</option>
            {/* Add more country options as needed */}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-medium">ZIP Code *</label>
          <input
            type="text"
            placeholder="ZIP Code"
            className="border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="mb-2 font-medium">Address *</label>
          <textarea
            placeholder="Full Address"
            className="border border-gray-300 rounded-md p-2 w-full"
            rows="3"
          ></textarea>
        </div>
        <div className="col-span-1 sm:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
