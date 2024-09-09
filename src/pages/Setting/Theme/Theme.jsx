import React, { useState } from 'react';

const Theme = () => {
  const [logoFile, setLogoFile] = useState(null);
  const [favIconFile, setFavIconFile] = useState(null);
  const [footerLogoFile, setFooterLogoFile] = useState(null);

  // Handlers for file input changes
  const handleLogoChange = (e) => setLogoFile(URL.createObjectURL(e.target.files[0]));
  const handleFavIconChange = (e) => setFavIconFile(URL.createObjectURL(e.target.files[0]));
  const handleFooterLogoChange = (e) => setFooterLogoFile(URL.createObjectURL(e.target.files[0]));

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (logoFile) formData.append('logo', logoFile);
    if (favIconFile) formData.append('favIcon', favIconFile);
    if (footerLogoFile) formData.append('footerLogo', footerLogoFile);

    // TODO: Implement backend API call to save theme settings
    // Example:
    // try {
    //   const response = await fetch('/api/save-theme', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   const data = await response.json();
    //   // Handle success
    //   console.log('Theme settings saved successfully:', data);
    // } catch (error) {
    //   // Handle error
    //   console.error('Error saving theme settings:', error);
    // }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6">Theme Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Logo Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Logo (128px, 43px)</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleLogoChange}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          {logoFile && (
            <div className="flex items-center space-x-4">
              <img src={logoFile} alt="Logo Preview" className="w-32 h-12 object-contain border rounded-md" />
              <p className="text-gray-500">File: {logoFile.split('/').pop()}</p>
            </div>
          )}
        </div>

        {/* Fav Icon Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Fav Icon (120px, 120px)</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFavIconChange}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          {favIconFile && (
            <div className="flex items-center space-x-4">
              <img src={favIconFile} alt="Fav Icon Preview" className="w-16 h-16 object-contain border rounded-md" />
              <p className="text-gray-500">File: {favIconFile.split('/').pop()}</p>
            </div>
          )}
        </div>

        {/* Footer Logo Upload */}
        <div className="flex flex-col">
          <label className="mb-2 font-medium">Footer Logo (144px, 48px)</label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={handleFooterLogoChange}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          {footerLogoFile && (
            <div className="flex items-center space-x-4">
              <img src={footerLogoFile} alt="Footer Logo Preview" className="w-36 h-12 object-contain border rounded-md" />
              <p className="text-gray-500">File: {footerLogoFile.split('/').pop()}</p>
            </div>
          )}
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
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

export default Theme;
